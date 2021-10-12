const express = require("express");
const router = express.Router();
const userAutcontroller = require("../controller/userController");

// const { requireSigninAdmin } = require("../middleware/authenticate");

router.post("/signup", userAutcontroller.signup);
router.post("/login", userAutcontroller.login);

module.exports = router;
