const { Likes, Posts, sequelize } = require("../models");

class LikesRepository {
  findLike = async (userId, postId) => {
    return await Likes.findOne({ where: { UserId: userId, PostId: postId } });
  };

  // 좋아요 추가와 게시글의 좋아요 수 증가를 하나의 트랜잭션으로 처리합니다.
  createLike = async (userId, postId) => {
    await sequelize.transaction(async (t) => {
      await Likes.create(
        { UserId: userId, PostId: postId },
        { transaction: t }
      );
      await Posts.increment("likedPostsCount", {
        where: { postId },
        transaction: t,
      });
    });
  };

  // 좋아요 삭제와 게시글의 좋아요 수 감소를 하나의 트랜잭션으로 처리합니다.
  deleteLike = async (userId, postId) => {
    await sequelize.transaction(async (t) => {
      await Likes.destroy({
        where: { UserId: userId, PostId: postId },
        transaction: t,
      });
      await Posts.decrement("likedPostsCount", {
        where: { postId },
        transaction: t,
      });
    });
  };

  findLikedPosts = async (userId) => {
    return await Likes.findAll({
      where: { UserId: userId },
      include: [
        {
          model: Posts,
          attributes: [
            "postId",
            "title",
            "content",
            "likedPostsCount",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  };
}

module.exports = LikesRepository;
