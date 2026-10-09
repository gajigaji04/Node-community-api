const { Comments } = require("../models");

const COMMENT_ATTRIBUTES = [
  "commentId",
  "UserId",
  "PostId",
  "comment",
  "createdAt",
  "updatedAt",
];

class CommentsRepository {
  findAllComments = async (postId) => {
    return await Comments.findAll({
      where: { PostId: postId },
      attributes: COMMENT_ATTRIBUTES,
      order: [["createdAt", "DESC"]],
    });
  };

  findCommentById = async (postId, commentId) => {
    return await Comments.findOne({
      where: { commentId, PostId: postId },
      attributes: COMMENT_ATTRIBUTES,
    });
  };

  createComment = async (userId, postId, comment) => {
    return await Comments.create({ UserId: userId, PostId: postId, comment });
  };

  updateComment = async (postId, commentId, comment) => {
    return await Comments.update(
      { comment },
      { where: { commentId, PostId: postId } }
    );
  };

  deleteComment = async (postId, commentId) => {
    return await Comments.destroy({ where: { commentId, PostId: postId } });
  };
}

module.exports = CommentsRepository;
