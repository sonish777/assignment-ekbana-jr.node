const paginate = (findQuery, page = 1) => {
  const skip = (page - 1) * 10;
  return findQuery.skip(skip).limit(10);
};

module.exports = paginate;
