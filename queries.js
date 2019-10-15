const { Client } = require("pg");

const client = new Client({
  user: "petarchord",
  password: "korgicpa50sd",
  host: "localhost",
  port: 5432,
  database: "manigoblogdb"
});

//console.log("pool:", pool);
client
  .connect()
  .then(() => console.log("connected successfuly"))
  .catch(e => console.log("error occured:", e))
  .finally(() => client.end());

const getAtricles = (req, res) => {
  client.query("SELECT * FROM article ORDER BY id ASC", (err, result) => {
    if (err) throw err;

    res.status(200).json(result.rows);
  });
};

const publishArticle = (req, res) => {
  const { userid, title, content } = req.body;

  client.query(
    "INSERT INTO article (title,content,userid) VALUES ($1, $2)",
    [title, content, userid],
    (err, result) => {
      if (err) throw err;

      res
        .status(200)
        .send(`Article with ID:${result.insertId} succesfully published`);
    }
  );
};

const updateArticle = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  client.query(
    "UPDATE article SET title = $1 , content = $2 WHERE id = $3",
    [title, content, id],
    (err, result) => {
      if (err) throw err;

      res.status(200).send(`User with id ${id} successfully updated`);
    }
  );
};

const createUser = (req, res) => {
  const { username, password } = req.body;

  client.query(
    "INSERT INTO user (username,password) VALUES ($1, $2)",
    [username, password],
    (err, result) => {
      if (err) throw err;

      res
        .status(200)
        .send(`User with ID:${result.insertId} succesfully created`);
    }
  );
};

const like = (req, res) => {
  const { articleId } = req.body;
  client.query(
    "INSERT INTO like (articleId) VALUES ($1)",
    [articleId],
    (err, result) => {
      if (err) throw err;

      res.status(200).send(`You succesfully liked article ${articleId}`);
    }
  );
};

const comment = (req, res) => {
  const { content, articleId, userId } = req.body;
  client.query(
    "INSERT INTO comment (content, articleId, userId) VALUES ($1, $2 ,$3)",
    [content, articleId, userId],
    (err, result) => {
      if (err) throw err;

      res.status(200).send(`You succesfully commented article ${articleId}`);
    }
  );
};

module.exports = {
  getAtricles,
  publishArticle,
  updateArticle,
  createUser,
  like,
  comment
};
