const { Posts, Users } = require("../models");

class PostsRepository {
  findAllPosts = async () => {
    return await Posts.findAll({
      attributes: [
        "postId",
        "UserId",
        "title",
        "likedPostsCount",
        "createdAt",
        "updatedAt",
      ],
      include: [{ model: Users, attributes: ["nickname"] }],
      order: [["createdAt", "DESC"]],
    });
  };

  findPostById = async (postId) => {
    return await Posts.findOne({
      where: { postId },
      include: [{ model: Users, attributes: ["nickname"] }],
    });
  };

  createPost = async (userId, title, content) => {
    return await Posts.create({ UserId: userId, title, content });
  };

  updatePost = async (postId, title, content) => {
    return await Posts.update({ title, content }, { where: { postId } });
  };

  deletePost = async (postId) => {
    return await Posts.destroy({ where: { postId } });
  };
}

module.exports = PostsRepository;
