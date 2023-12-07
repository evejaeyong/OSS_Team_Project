const express = require('express');
const jsonData = require('./Data.json');
const app = express();
const port = 3000;

let userDataList = [];
let postDataList = [];

app.use(express.json());
app.use(express.static('public'));

app.get("/userData", (req, res) => {
    res.json(userDataList);
})

app.get("/postData", (req, res) => {
    res.json(postDataList);
})

app.post("/myFollowing", (req, res) => {
    userDataList.forEach((user) => {
        if (user.ID === req.body.loginState.ID) {
            res.json(user.following);
            return;
        }
    })
    res.json([]);
})

app.post("/signup", (req, res) => {
    userDataList.push(req.body.userData);
    console.log(userDataList);
    //res.redirect(200, "./main.html");
});

// Upload new post to postData of server
app.post("/upload", (req, res) => {
    postDataList.push(req.body.postData);
})

app.post("/following", (req, res) => {
    userDataList.forEach((user) => {
        if (user.ID === req.body.loginState.ID) {
            user.following.push(req.body.post);
            return;
        }
    })
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    loadData();
});

function loadData() {
    userDataList = jsonData.userData;
    postDataList = jsonData.postData;
}