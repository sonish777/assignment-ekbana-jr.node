module.exports.filterRequestBody = (body, keys) => {
  const filteredBody = {};
  Object.keys(body).forEach((key) => {
    keys.indexOf(key) != -1 && (filteredBody[key] = body[key]);
  });
  return filteredBody;
};
