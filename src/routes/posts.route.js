const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const PostsController = require("../controllers/posts.controller");

const router = express.Router();
const postsController = new PostsController();

router.post("/", authMiddleware, postsController.createPost);
router.get("/", postsController.getPosts);
router.get("/:postId", postsController.getPost);
router.put("/:postId", authMiddleware, postsController.updatePost);
router.delete("/:postId", authMiddleware, postsController.deletePost);

module.exports = router;
