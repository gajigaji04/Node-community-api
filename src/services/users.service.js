const jwt = require("jsonwebtoken");
const UsersRepository = require("../repositories/users.repository");
const HttpError = require("../utils/http-error");

// 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)
const NICKNAME_REGEX = /^[a-zA-Z0-9]{3,}$/;
// 최소 4자 이상, 공백 없는 ASCII 문자, 같은 문자 4번 이상 연속 금지
const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z0-9])(?!.*[^\x21-\x7E])(?!.*([a-zA-Z0-9])\1{3}).{4,}$/;

class UsersService {
  usersRepository = new UsersRepository();

  signup = async (nickname, password, confirm) => {
    if (typeof nickname !== "string" || typeof password !== "string") {
      throw new HttpError(400, "닉네임과 비밀번호를 입력해주세요.");
    }

    if (!NICKNAME_REGEX.test(nickname)) {
      throw new HttpError(
        400,
        "닉네임은 최소 3자 이상이어야 하며, 알파벳 대소문자와 숫자만 사용할 수 있습니다."
      );
    }

    if (!PASSWORD_REGEX.test(password) || password.includes(nickname)) {
      throw new HttpError(
        400,
        "비밀번호는 최소 4자 이상이어야 하며, 닉네임과 같은 값이 포함될 수 없습니다."
      );
    }

    if (password !== confirm) {
      throw new HttpError(400, "비밀번호가 일치하지 않습니다.");
    }

    const existingUser = await this.usersRepository.findUserByNickname(nickname);
    if (existingUser) {
      throw new HttpError(409, "중복된 닉네임입니다.");
    }

    await this.usersRepository.createUser(nickname, password);
  };

  // 로그인에 성공하면 JWT를 발급합니다.
  login = async (nickname, password) => {
    const user = await this.usersRepository.findUserByNickname(nickname);
    if (!user || user.password !== password) {
      throw new HttpError(401, "닉네임 또는 패스워드를 확인해주세요.");
    }

    return jwt.sign({ userId: user.userId }, process.env.JWT_SECRET);
  };
}

module.exports = UsersService;
