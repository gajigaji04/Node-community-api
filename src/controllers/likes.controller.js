const LikesService = require("../services/likes.service");

class LikesController {
  likesService = new LikesService();

  // 좋아요 등록 / 취소
  toggleLike = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { liked, likedPostsCount } = await this.likesService.toggleLike(
        userId,
        postId
      );

      return res.status(200).json({
        message: liked
          ? "게시글 좋아요를 등록하였습니다."
          : "게시글 좋아요를 취소하였습니다.",
        likedPostsCount,
      });
    } catch (error) {
      next(error);
    }
  };

  // 좋아요한 게시글 목록 조회
  getLikedPosts = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const posts = await this.likesService.findLikedPosts(userId);

      return res.status(200).json({ data: posts });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = LikesController;
