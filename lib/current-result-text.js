module.exports = (results) => {
  text = "";
  for (var key in results) {
    if (results.hasOwnProperty(key)) {
      text = `${text} ${key}: ${results[key].length}`;
    }
  }
  return text;
};
