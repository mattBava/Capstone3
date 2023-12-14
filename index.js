import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";





const app = express();
const port = 3000;
var postCount = 0;
var postTitle = [];
var postBody = [];
var postTime = [];
var postEdit = 0;
var postChange = 0;
var editMade = false;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//renders home page
app.get("/", (req, res) => {
    res.render("index.ejs", { Count: postCount, post: postBody, title: postTitle, Time: postTime, edit: editMade })

})

/* 
Adds new Post to the text file
*/

app.post("/add", (req, res) => {

    editMade = false;
    var currentdate = new Date();
    var datetime = "Created: " + (currentdate.getMonth() + 1) + "/"
        + currentdate.getDate() + "/"
        + currentdate.getFullYear()


    postTitle[postCount] = req.body.postTitle;
    postBody[postCount] = req.body.newPost;
    postTime[postCount] = datetime;

    postCount++;
    /*fs.appendFile("files/" + req.body.postTitle + ".txt", fullPost, function (err) {       
        if (err) throw err;
        console.log('Saved!');
    });
*/
    res.redirect("/")


})

/*
index to create post page 
*/
app.get("/post", (req, res) => {
    res.render("post.ejs")
})

/*Edit Post: finds which button has been pressed by going through each button till one is defined then send used to edit page with post number so that the fields are filled with the post available for edit*/

app.post("/edit", (req, res) => {
    editMade = false;
    for (var i = 0; i < postCount; i++) {
        postEdit = req.body[i];
        if (!(typeof postEdit === 'undefined')) {
            postChange = i;
            res.render("edit.ejs", { Count: postCount, post: postBody, title: postTitle, Time: postTime, postNumber: i })
        }
    }
});


//commits changes made on edit page to the arrays and redirects to home page
app.post("/change", (req, res) => {
    var currentdate = new Date();
    var datetime = "Created: " + (currentdate.getMonth() + 1) + "/"
        + currentdate.getDate() + "/"
        + currentdate.getFullYear()

    postTitle[postChange] = req.body.postTitle;
    postBody[postChange] = req.body.newPost;
    postTime[postChange] = datetime;

    editMade = true;

    res.redirect("/");
})

/*Open port for local host*/
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});