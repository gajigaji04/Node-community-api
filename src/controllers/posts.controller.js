const PostsService = require("../services/posts.service");

class PostsController {
  postsService = new PostsService();

  // 게시글 생성
  createPost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { title, content } = req.body;
      const post = await this.postsService.createPost(userId, title, content);

      return res.status(201).json({ data: post });
    } catch (error) {
      next(error);
    }
  };

  // 게시글 목록 조회
  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postsService.findAllPosts();

      return res.status(200).json({ data: posts });
    } catch (error) {
      next(error);
    }
  };

  // 게시글 상세 조회
  getPost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await this.postsService.findPostById(postId);

      return res.status(200).json({ data: post });
    } catch (error) {
      next(error);
    }
  };

  // 게시글 수정
  updatePost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { title, content } = req.body;
      await this.postsService.updatePost(userId, postId, title, content);

      return res.status(200).json({ message: "게시글 수정을 완료하였습니다." });
    } catch (error) {
      next(error);
    }
  };

  // 게시글 삭제
  deletePost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      await this.postsService.deletePost(userId, postId);

      return res.status(200).json({ message: "게시글 삭제를 완료하였습니다." });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PostsController;
