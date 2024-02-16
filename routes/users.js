const router = require("express").Router();
const { createUser, login, getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateSignup, validateSignin } = require("../middlewares/validation");

router.get("/users/me", auth, getCurrentUser);
router.post("/signin", validateSignin, login);
router.post("/signup", validateSignup, createUser);

module.exports = router;
