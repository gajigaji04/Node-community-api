// 서비스 계층에서 HTTP 상태 코드와 함께 던지는 에러
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = HttpError;
