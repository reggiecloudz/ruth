const joi = require('joi');

module.exports.ValidateSchema = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error });
    }
  };
};
module.exports.Schemas = {
  article: {
    create: joi.object({
      title: joi.string().required(),
      author: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    }),
    update: joi.object({
      title: joi.string().required(),
      author: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    })
  },
  user: {
    create: joi.object({
      email: joi
        .string()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required(),
      name: joi.string().required(),
      password: joi.string().required()
    }),
    update: joi.object({
      email: joi
        .string()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required(),
      name: joi.string().required(),
      password: joi.string()
    })
  }
};
