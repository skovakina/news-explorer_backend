const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingitems");
const auth = require("../middlewares/auth");

const { validateCardBody, validateId } = require("../middlewares/validation");

router.get("/items", getItems);
router.post("/items", auth, validateCardBody, createItem);
router.delete("/items/:_id", auth, validateId, deleteItem);

router.put("/items/:_id/likes", auth, validateId, likeItem);
router.delete("/items/:_id/likes", auth, validateId, dislikeItem);

module.exports = router;
