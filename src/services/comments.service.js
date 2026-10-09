const CommentsRepository = require("../repositories/comments.repository");
const PostsService = require("./posts.service");
const HttpError = require("../utils/http-error");

const toCommentResponse = (comment) => ({
  commentId: comment.commentId,
  userId: comment.UserId,
  postId: comment.PostId,
  comment: comment.comment,
  createdAt: comment.createdAt,
  updatedAt: comment.updatedAt,
});

class CommentsService {
  commentsRepository = new CommentsRepository();
  postsService = new PostsService();

  findAllComments = async (postId) => {
    await this.postsService.getExistingPost(postId);

    const comments = await this.commentsRepository.findAllComments(postId);

    return comments.map(toCommentResponse);
  };

  findCommentById = async (postId, commentId) => {
    const comment = await this.getExistingComment(postId, commentId);

    return toCommentResponse(comment);
  };

  createComment = async (userId, postId, comment) => {
    this.validateCommentInput(comment);
    await this.postsService.getExistingPost(postId);

    const createdComment = await this.commentsRepository.createComment(
      userId,
      Number(postId),
      comment
    );

    return toCommentResponse(createdComment);
  };

  updateComment = async (userId, postId, commentId, comment) => {
    this.validateCommentInput(comment);

    const existingComment = await this.getExistingComment(postId, commentId);
    if (existingComment.UserId !== userId) {
      throw new HttpError(403, "댓글을 수정할 권한이 없습니다.");
    }

    await this.commentsRepository.updateComment(postId, commentId, comment);

    const updatedComment = await this.commentsRepository.findCommentById(
      postId,
      commentId
    );

    return toCommentResponse(updatedComment);
  };

  deleteComment = async (userId, postId, commentId) => {
    const existingComment = await this.getExistingComment(postId, commentId);
    if (existingComment.UserId !== userId) {
      throw new HttpError(403, "댓글을 삭제할 권한이 없습니다.");
    }

    await this.commentsRepository.deleteComment(postId, commentId);
  };

  getExistingComment = async (postId, commentId) => {
    const comment = await this.commentsRepository.findCommentById(
      postId,
      commentId
    );
    if (!comment) {
      throw new HttpError(404, "댓글을 찾을 수 없습니다.");
    }

    return comment;
  };

  validateCommentInput = (comment) => {
    if (!comment) {
      throw new HttpError(400, "댓글 내용을 입력해주세요.");
    }
  };
}

module.exports = CommentsService;
