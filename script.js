
let loginState = {
    ID: "",
    PW: "",
    gender: "",
    email: ""
};

window.addEventListener("load", () => {

    if (localStorage.getItem("state") === "null") {
        loginState = {};
    }
    else {
        loginState = JSON.parse(localStorage.getItem("state"));
    }

})

window.addEventListener('unload', () => {
    updateLocalStorage();
})

function updateLocalStorage() {

    localStorage.setItem("state", JSON.stringify(loginState));

}

async function login() {
    let inputID = document.querySelector("#IDinput");
    let inputPW = document.querySelector("#PWinput");

    if (inputID.value === "") {
        let idAlert = document.querySelector("#ID-alert");
        idAlert.innerHTML = "아이디를 입력해주세요."
        return;
    }
    else {
        let idAlert = document.querySelector("#ID-alert");
        idAlert.innerHTML = ""
    }

    if (inputPW.value === "") {
        let pwAlert = document.querySelector("#PW-alert");
        pwAlert.innerHTML = "비밀번호를 입력해주세요."
        return;
    }
    else {
        let pwAlert = document.querySelector("#PW-alert");
        pwAlert.innerHTML = ""
    }

    const data = await fetch('Data.json');
    const obj = await data.json();

    const userDataList = obj.userData;

    let targetData;

    userDataList.forEach((data) => {
        if (data.ID === inputID.value) {
            targetData = data;
        }
    })

    if (targetData) {
        if (targetData.PW === inputPW.value) {
            loginState = targetData;
            location.reload();
        }
    }
}

async function sign_up() {
    let inputID = document.querySelector("#IDinput");
    let inputPW = document.querySelector("#PWinput");
    let inputRadio = document.getElementsByName("genderradio");
    let inputEmail = document.querySelector("#e-mailinput");

    let find = 0;

    const data = await fetch('Data.json');
    const obj = await data.json();

    const userDataList = obj.userData;

    userDataList.forEach((data) => {
        if (data.ID === inputID.value) {
            find = 1;
        }
    })

    if (find === 1) {
        //이미 있으면 에러
        return;
    }

    let userData = {
        ID: inputID.value,
        PW: inputPW.value,
        gender: "",
        email: inputEmail.value
    }

    inputRadio.forEach((node) => {
        if (node.checked) {
            userData.gender = node.value;
        }
    });

    userDataList.push(userData);

    console.log(userDataList);

    location.href = "index.html";

}

