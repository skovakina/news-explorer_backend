const router = require("express").Router();
const {
  getArticles,
  addArticle,
  deleteArticle,
} = require("../controllers/articles");
const auth = require("../middlewares/auth");

const {
  validateArticleBody,
  validateId,
} = require("../middlewares/validation");

router.get("/articles", getArticles);
router.post("/articles", auth, validateArticleBody, addArticle);
router.delete("/articles/:_id", auth, validateId, deleteArticle);

module.exports = router;
