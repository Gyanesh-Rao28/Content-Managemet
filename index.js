const express = require("express");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
const Content = require("./models/content");
const { result, method } = require("lodash");
// exrpess app

const app = express();

// connect to mongo
const dbURI =
  "mongodb+srv://user1:hello123@zad.dlezpks.mongodb.net/note-tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// register view engine

app.set("view engine", "ejs");

// middleware & static files

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// basic routes
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// blog routes

app.get("/blog", (req, res) => {
  Content.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blog", { title: "Blog", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Content(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blog");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/admin", (req, res) => {
  res.render("admin", { title: "Admin" });
});
//404-page
app.use((req, res) => {
  res.render("404", { title: "Error" });
});
