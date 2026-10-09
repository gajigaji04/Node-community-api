const express = require("express");
const usersRouter = require("./users.route");
const postsRouter = require("./posts.route");
const commentsRouter = require("./comments.route");
const likesRouter = require("./likes.route");

const router = express.Router();

router.use("/", usersRouter);
router.use("/", likesRouter);
router.use("/posts", postsRouter);
router.use("/posts/:postId/comments", commentsRouter);

module.exports = router;
