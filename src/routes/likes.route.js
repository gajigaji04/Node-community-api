const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const LikesController = require("../controllers/likes.controller");

const router = express.Router();
const likesController = new LikesController();

router.post("/posts/:postId/like", authMiddleware, likesController.toggleLike);
router.get("/like", authMiddleware, likesController.getLikedPosts);

module.exports = router;
