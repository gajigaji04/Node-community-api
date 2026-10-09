const CommentsService = require("../services/comments.service");

class CommentsController {
  commentsService = new CommentsService();

  // 댓글 생성
  createComment = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { comment } = req.body;
      const createdComment = await this.commentsService.createComment(
        userId,
        postId,
        comment
      );

      return res.status(201).json({ data: createdComment });
    } catch (error) {
      next(error);
    }
  };

  // 댓글 목록 조회
  getComments = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const comments = await this.commentsService.findAllComments(postId);

      return res.status(200).json({ data: comments });
    } catch (error) {
      next(error);
    }
  };

  // 댓글 상세 조회
  getComment = async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;
      const comment = await this.commentsService.findCommentById(
        postId,
        commentId
      );

      return res.status(200).json({ data: comment });
    } catch (error) {
      next(error);
    }
  };

  // 댓글 수정
  updateComment = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId, commentId } = req.params;
      const { comment } = req.body;
      const updatedComment = await this.commentsService.updateComment(
        userId,
        postId,
        commentId,
        comment
      );

      return res.status(200).json({ data: updatedComment });
    } catch (error) {
      next(error);
    }
  };

  // 댓글 삭제
  deleteComment = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId, commentId } = req.params;
      await this.commentsService.deleteComment(userId, postId, commentId);

      return res.status(200).json({ message: "댓글 삭제를 완료하였습니다." });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CommentsController;
