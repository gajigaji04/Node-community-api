const express = require("express");
const UsersController = require("../controllers/users.controller");

const router = express.Router();
const usersController = new UsersController();

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);

module.exports = router;
