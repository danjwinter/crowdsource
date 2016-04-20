module.exports = (key, value, app) => {
  app.locals.surveys[key] = value;
};
