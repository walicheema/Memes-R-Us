const express = require("express");
const { getMemeUrl, addMemeUrl } = require("./memes");
const app = express();

app.get("/", (req, res) => {
  getMemeUrl()
    .then(memeUrl => res.render("index", { memeUrl }));
});

app.listen(3000, () => console.log("Listening on port 3000"));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded());

app.post("/add-meme", (req, res) => {
  addMemeUrl(req.body.memeUrl)
    .then(() => res.redirect("/"));
});
