function successHandler(res, status, successMsg) {
  res.status(status).json({ message: successMsg });
}

module.exports = successHandler;
