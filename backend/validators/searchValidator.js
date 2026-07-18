const searchValidator = {
  city: {
    required: true,
    type: "string",
    minLength: 2,
  },
  type: {
    required: true,
    type: "string",
    minLength: 2,
  },
};

module.exports = searchValidator;
