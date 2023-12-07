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

    loadFollowing();

})

window.addEventListener('unload', () => {
    updateLocalStorage();
})

function updateLocalStorage() {
    localStorage.setItem("state", JSON.stringify(loginState));

}

async function loadFollowing() {
    fetch("/myFollowing", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginState })
    })
        .then((res) => res.json())
        .then((dataList) => {

            dataList.forEach((post) => {
                insertFollwoing(post);
            })
        })
}

function insertFollwoing(post) {
    const content_container = document.querySelector('.content-container');
    const indiv_content = document.createElement("div");

    indiv_content.classList.add("indiv-content", "shadow-sm", "d-flex");
    indiv_content.innerHTML = `<div class="indiv-info flex-grow-1">
    <p><strong>이름 : ${post.name}</strong></p>
    <p>나이 : ${post.age}</p>
    <p>거주지 : ${post.home}</p>
  </div>`;

    content_container.appendChild(indiv_content);
}