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

    fetch("/upload", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postData })
    })

    modal.classList.add('hidden');
})

window.addEventListener("load", () => {

    if (localStorage.getItem("state") === "null") {
        loginState = {};
    }
    else {
        loginState = JSON.parse(localStorage.getItem("state"));

        if (loginState.gender == "Woman") {
            postbtn.disabled = true;
        }
    }

    loadPost();

})

async function loadPost() {
    fetch("/postData", { method: "GET" })
        .then((res) => res.json())
        .then((postDataList) => {

            postDataList.forEach((post) => {
                if (post.gender == "Man")
                    insertPost(post);
            })
        })
}

function insertPost(post) {
    const content_container = document.querySelector('.content-container');
    const indiv_content = document.createElement("div");
    const indiv_info = document.createElement("div");
    const btn_heart = document.createElement("button");

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
        <p>한 줄 평 : ${post.Intro}</p>`;

    btn_heart.classList.add("btn-love", "btn");

    btn_heart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
    class="bi bi-suit-heart-fill bg-heart" viewBox="0 0 16 16">
    <path
      d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
  </svg>`;

    btn_heart.addEventListener('click', () => {
        fetch("/following", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ loginState, post })
        })
    })

    indiv_content.appendChild(indiv_info);
    indiv_content.appendChild(btn_heart);

    content_container.appendChild(indiv_content);
}

window.addEventListener('unload', () => {
    updateLocalStorage();
})

function updateLocalStorage() {
    localStorage.setItem("state", JSON.stringify(loginState));
}