const UsersService = require("../services/users.service");

class UsersController {
  usersService = new UsersService();

  // 회원가입
  signup = async (req, res, next) => {
    try {
      const { nickname, password, confirm } = req.body;
      await this.usersService.signup(nickname, password, confirm);

      return res.status(201).json({ message: "회원가입이 완료되었습니다." });
    } catch (error) {
      next(error);
    }
  };

  // 로그인
  login = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;
      const token = await this.usersService.login(nickname, password);

      res.cookie("authorization", `Bearer ${token}`);
      return res.status(200).json({ message: "로그인에 성공하였습니다." });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UsersController;
