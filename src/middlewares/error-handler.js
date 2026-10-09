// 컨트롤러에서 next(error)로 넘어온 에러를 한 곳에서 응답으로 변환합니다.
module.exports = (error, req, res, next) => {
  if (error.status) {
    return res.status(error.status).json({ errorMessage: error.message });
  }

  console.error(error);
  return res.status(500).json({ errorMessage: "서버 오류가 발생했습니다." });
};
