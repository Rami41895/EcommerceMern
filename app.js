const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const categorieRouter = require("./routes/categorie.route");
const articleRouter = require("./routes/article.route");
const scategorieRouter = require("./routes/scategorie.route");

dotenv.config();
app.use(express.json());

// 5ater elback yesta3mel f port 3001 w frontend 3000 deux port different
app.use(cors());

// Connexion à la base donnéess
mongoose
  .connect(process.env.DATABASECLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connexion à la base de données réussie");
  })
  .catch((err) => {
    console.log("Impossible de se connecter à la base de données", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send("Bibliothèque");
});

app.use("/api/categories", categorieRouter);
app.use("/api/articles", articleRouter);
app.use("/api/scategories", scategorieRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

module.exports = app;
