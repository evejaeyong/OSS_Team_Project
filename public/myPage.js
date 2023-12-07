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
    const indiv_info = document.createElement("div");

    indiv_content.classList.add("indiv-content", "shadow-sm", "d-flex");
    indiv_info.classList.add("indiv-info", "flex-grow-1");
    indiv_info.innerHTML =
        `<div class="d-flex">
            <p class="flex-grow-1" style="width:50%;">이름 : ${post.name}</p>
            <p class="flex-grow-1" style="width:50%;">나이 : ${post.age}</p>
        </div>
        <div class="d-flex">
            <p class="flex-grow-1" style="width:50%;">MBTI : ${post.mbti}</p>
            <p class="flex-grow-1" style="width:50%;">거주지 : ${post.home}</p>
        </div>
        <p>한 줄 평 : ${post.intro}</p>`;



    indiv_content.appendChild(indiv_info);


    content_container.appendChild(indiv_content);
}