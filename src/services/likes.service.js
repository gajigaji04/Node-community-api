const LikesRepository = require("../repositories/likes.repository");
const PostsService = require("./posts.service");

class LikesService {
  likesRepository = new LikesRepository();
  postsService = new PostsService();

  // 이미 좋아요를 눌렀다면 취소하고, 아니라면 등록합니다.
  toggleLike = async (userId, postId) => {
    await this.postsService.getExistingPost(postId);

    const existingLike = await this.likesRepository.findLike(userId, postId);
    if (existingLike) {
      await this.likesRepository.deleteLike(userId, postId);
    } else {
      await this.likesRepository.createLike(userId, postId);
    }

    const post = await this.postsService.getExistingPost(postId);

    return {
      liked: !existingLike,
      likedPostsCount: post.likedPostsCount,
    };
  };

  findLikedPosts = async (userId) => {
    const likes = await this.likesRepository.findLikedPosts(userId);

    return likes.map(({ Post: post }) => ({
      postId: post.postId,
      title: post.title,
      content: post.content,
      likedPostsCount: post.likedPostsCount,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));
  };
}

module.exports = LikesService;
