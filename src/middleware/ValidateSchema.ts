import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IArticle } from '../models/Article';
import { IUser } from '../models/User';

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  article: {
    create: Joi.object<IArticle>({
      title: Joi.string().required(),
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    }),
    update: Joi.object<IArticle>({
      title: Joi.string().required(),
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    })
  },
  user: {
    create: Joi.object<IUser>({
      email: Joi.string()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required(),
      name: Joi.string().required()
    }),
    update: Joi.object<IUser>({
      email: Joi.string()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required(),
      name: Joi.string().required()
    })
  }
};
