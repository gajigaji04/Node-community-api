const PostsRepository = require("../repositories/posts.repository");
const HttpError = require("../utils/http-error");

class PostsService {
  postsRepository = new PostsRepository();

  findAllPosts = async () => {
    const posts = await this.postsRepository.findAllPosts();

    return posts.map((post) => ({
      postId: post.postId,
      userId: post.UserId,
      nickname: post.User.nickname,
      title: post.title,
      likedPostsCount: post.likedPostsCount,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));
  };

  findPostById = async (postId) => {
    const post = await this.getExistingPost(postId);

    return {
      postId: post.postId,
      userId: post.UserId,
      nickname: post.User.nickname,
      title: post.title,
      content: post.content,
      likedPostsCount: post.likedPostsCount,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };

  createPost = async (userId, title, content) => {
    this.validatePostInput(title, content);

    const post = await this.postsRepository.createPost(userId, title, content);

    return {
      postId: post.postId,
      userId: post.UserId,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };

  updatePost = async (userId, postId, title, content) => {
    this.validatePostInput(title, content);

    const post = await this.getExistingPost(postId);
    if (post.UserId !== userId) {
      throw new HttpError(403, "게시글을 수정할 권한이 없습니다.");
    }

    await this.postsRepository.updatePost(postId, title, content);
  };

  deletePost = async (userId, postId) => {
    const post = await this.getExistingPost(postId);
    if (post.UserId !== userId) {
      throw new HttpError(403, "게시글을 삭제할 권한이 없습니다.");
    }

    await this.postsRepository.deletePost(postId);
  };

  getExistingPost = async (postId) => {
    const post = await this.postsRepository.findPostById(postId);
    if (!post) {
      throw new HttpError(404, "게시글을 찾을 수 없습니다.");
    }

    return post;
  };

  validatePostInput = (title, content) => {
    if (!title || !content) {
      throw new HttpError(400, "제목과 내용을 입력해주세요.");
    }
  };
}

module.exports = PostsService;
