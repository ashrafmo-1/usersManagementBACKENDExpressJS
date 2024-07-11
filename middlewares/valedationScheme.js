const { body } = require("express-validator");
const validate = () => {
  return [
    body("name").notEmpty().withMessage("Missing name").isLength({ min: 3 }),
    body("email").notEmpty()
  ];
};


module.exports = {
  validate
};