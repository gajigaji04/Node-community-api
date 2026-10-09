const { Transaction } = require("sequelize");
const { Users, UserInfos, sequelize } = require("../models");

class UsersRepository {
  findUserById = async (userId) => {
    return await Users.findOne({ where: { userId } });
  };

  findUserByNickname = async (nickname) => {
    return await Users.findOne({ where: { nickname } });
  };

  // Users와 UserInfos를 하나의 트랜잭션으로 생성합니다.
  createUser = async (nickname, password) => {
    return await sequelize.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (t) => {
        const user = await Users.create(
          { nickname, password },
          { transaction: t }
        );
        await UserInfos.create(
          { UserId: user.userId, nickname },
          { transaction: t }
        );

        return user;
      }
    );
  };
}

module.exports = UsersRepository;
