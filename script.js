let userDataList = [];
let loginState = 0;

window.addEventListener("load", () => {
    userDataList = (JSON.parse(JSON.stringify(UserData))).data;
})

function login() {
    let inputID = document.querySelector("#IDinput");
    let inputPW = document.querySelector("#PWinput");

    if (inputID.value == "" || inputPW.value == "") {
        return;
    }

    let targetData;

    userDataList.forEach((data) => {
        if (data.ID === inputID.value) {
            targetData = data;
        }
    })

    if (targetData) {
        if (targetData.PW === inputPW.value) {
            loginState = 1;
            location.reload();
        }
    }
}

function sign_up() {
    let inputID = document.querySelector("#IDinput");
    let inputPW = document.querySelector("#PWinput");
    let inputRadio = document.getElementsByName("genderradio");
    let inputEmail = document.querySelector("#e-mailinput");
    let userDataList = (JSON.parse(JSON.stringify(UserData))).data;

    let find = 0;

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

