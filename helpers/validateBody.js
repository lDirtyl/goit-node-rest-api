import HttpError from "../helpers/HttpError.js";

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      if (error.details[0].type === "object.min") {
        next(HttpError(400, "Body must have at least one field"));
      } else {
        next(HttpError(400, error.message));
      }
    } else {
      next();
    }
  };
};

export default validateBody;
