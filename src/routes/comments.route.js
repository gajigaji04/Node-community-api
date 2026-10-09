const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const CommentsController = require("../controllers/comments.controller");

// 상위 라우터의 :postId를 사용하기 위해 mergeParams를 켭니다.
const router = express.Router({ mergeParams: true });
const commentsController = new CommentsController();

router.post("/", authMiddleware, commentsController.createComment);
router.get("/", commentsController.getComments);
router.get("/:commentId", commentsController.getComment);
router.put("/:commentId", authMiddleware, commentsController.updateComment);
router.delete("/:commentId", authMiddleware, commentsController.deleteComment);

module.exports = router;
