const errorHandler = (res, error) => {
  res.status(500).send({ messege: ` Error:${error}` });
  console.log(error);
};

module.exports = {
  errorHandler,
};
