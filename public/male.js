let loginState = {
    ID: "",
    PW: "",
    gender: "",
    email: ""
};

const postbtn = document.querySelector("#btn-post");
const modalCloseButton = document.getElementById('modalCloseButton');
const modal = document.querySelector('#modal');
const modalPostButton = document.querySelector("#modalPostButton");

postbtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

modalCloseButton.addEventListener('click', () => {
    modal.classList.add('hidden');
});

modalPostButton.addEventListener('click', () => {
    const postNameInput = document.querySelector('#postNameInput');
    const postAgeInput = document.querySelector('#postAgeInput');
    const MBTIinput = document.querySelector('#MBTI');
    const locationInput = document.querySelector("#location");

    let postData = {
        name: postNameInput.value,
        age: postAgeInput.value,
        mbti: MBTIinput.value,
        home: locationInput.value
    }

    insertPost(postData);

    modal.classList.add('hidden');
})

window.addEventListener("load", () => {

    if (localStorage.getItem("state") === "null") {
        loginState = {};
    }
    else {
        loginState = JSON.parse(localStorage.getItem("state"));
    }

    loadPost();

})

async function loadPost() {
    fetch("/postData", { method: "GET" })
        .then((res) => res.json())
        .then((postDataList) => {

            postDataList.forEach((post) => {
                insertPost(post);
            })
        })
}

function insertPost(post) {
    const content_container = document.querySelector('.content-container');
    const indiv_content = document.createElement("div");

    indiv_content.classList.add("indiv-content", "shadow-sm", "d-flex");
    indiv_content.innerHTML = `<div class="indiv-info flex-grow-1">
    <p><strong>이름 : ${post.name}</strong></p>
    <p>나이 : ${post.age}</p>
    <p>거주지 : ${post.home}</p>
  </div>
  <button class="btn-love btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
      class="bi bi-suit-heart-fill bg-heart" viewBox="0 0 16 16">
      <path
        d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
    </svg></button>`;

    content_container.appendChild(indiv_content);
}

window.addEventListener('unload', () => {
    updateLocalStorage();
})