const jwt = require("jsonwebtoken");
const UsersRepository = require("../repositories/users.repository");

const usersRepository = new UsersRepository();

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.cookies;
    if (!authorization) {
      return res.status(401).json({ errorMessage: "로그인이 필요합니다." });
    }

    const [tokenType, token] = authorization.split(" ");
    if (tokenType !== "Bearer" || !token) {
      return res
        .status(401)
        .json({ errorMessage: "토큰 타입이 일치하지 않습니다." });
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await usersRepository.findUserById(userId);
    if (!user) {
      res.clearCookie("authorization");
      return res
        .status(401)
        .json({ errorMessage: "토큰 사용자가 존재하지 않습니다." });
    }
    res.locals.user = user;

    next();
  } catch (error) {
    res.clearCookie("authorization");
    return res.status(401).json({ errorMessage: "비정상적인 요청입니다." });
  }
};
