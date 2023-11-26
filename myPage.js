let userDataList = [];
let loginState = {
    ID: "",
    PW: "",
    gender: "",
    email: ""
};

window.addEventListener("load", () => {

    if (localStorage.getItem("data") === "null") {
        userDataList = [];
    }
    else {
        userDataList = JSON.parse(localStorage.getItem("data"));
    }
    if (localStorage.getItem("state") === "null") {
        loginState = {};
    }
    else {
        loginState = JSON.parse(localStorage.getItem("state"));
    }

    if (loginState.ID === "")
        location.href = "index.html";

})

window.addEventListener('unload', () => {
    updateLocalStorage();
})

function updateLocalStorage() {

    localStorage.setItem("data", JSON.stringify(userDataList));
    localStorage.setItem("state", JSON.stringify(loginState));

}