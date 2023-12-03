const express = require('express');
const jsonData = require('./Data.json');
const app = express();
const port = 3000;

let userDataList = [];

app.use(express.json());
app.use(express.static('public'));

app.get("/userData", (req, res) => {
    res.json(userDataList);
})

app.post("/signup", (req, res) => {
    userDataList.push(req.body.userData);
    console.log(userDataList);
    //res.redirect(200, "./main.html");
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    loadData();
});

function loadData() {

    userDataList = jsonData.userData;
    console.log(userDataList);
}