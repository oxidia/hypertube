module.exports = error => {
  const errors = {};

  error.details.forEach(item => {
    errors[item.context.key] = item.message;
  });

  return errors;
};
