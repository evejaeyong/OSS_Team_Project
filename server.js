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

app.post("/signup", (req, res) => {
    userDataList.push(req.body.userData);
    console.log(userDataList);
    //res.redirect(200, "./main.html");
});

app.post("/upload", (req, res) => {
    postDataList.push(req.body.postData);
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    loadData();
});

function loadData() {
    userDataList = jsonData.userData;
    postDataList = jsonData.postData;
}