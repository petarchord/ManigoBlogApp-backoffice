const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const db = require("./queries");
const port = 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.get("/", db.getAtricles);
app.post("/article", db.publishArticle);
app.put("/article/:id", db.updateArticle);
app.post("/user", db.createUser);
app.post("/comment", db.comment);
app.post("/like", db.like);

app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});
