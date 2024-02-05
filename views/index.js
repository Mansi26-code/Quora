const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
// const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: "me",
        username: "Mansi Swaraj",
        content: "I love Coding"
    },
    {
        id: "mummy",
        username: "Anshu",
        content: "Hardwork is the key to success"
    },
    {
        id: "papa",
        username: "Rajnish",
        content: "Hardwork is the key to success"
    },
    {
        id: "bhai",
        username: "Rudra",
        content: "I am in 8th standard"
    },
];

app.get("/posts", (req, res) => {
    res.render(__dirname + "/index.ejs", { posts: posts });
});

app.get("/posts/new", (req, res) => {
    res.render(__dirname + "/new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    posts.push({
        id: uuidv4(),
        username,
        content
    });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log("Requested ID:", id);
    console.log("All Posts:", posts);

    let post = posts.find((p) => id === p.id);

    if (post) {
        console.log("Found Post:", post);
        res.render(__dirname + "/show.ejs", { post });
    } else {
        console.log(`Post with id ${id} not found`);
        res.render(__dirname + "/show.ejs", { post: null });
    }
});


app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    // let newContent = req.body.content;
    // console.log(newContent);
    
    res.send("Patch request working");
});

app.listen(port, () => {
    console.log("Listening to port: 8080");
});
