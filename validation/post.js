import joi from "joi";
import joiObjectid from "joi-objectid";

joi.objectId = joiObjectid(joi);

export const postValidation = joi.object({
  title: joi.string().min(3).max(50).required(),
  body: joi.string().min(3).max(200).required(),
  author: joi.objectId().required(),
  tags: joi.array().items(joi.objectId()).required(),
});

export const updatePostValidation = joi.object({
  title: joi.string().min(3).max(50).optional(),
  body: joi.string().min(3).max(200).optional(),
  tags: joi.array().items(joi.objectId()).optional(),
});

export const checkPostTitleValidation = joi.object({
  title: joi.string().min(3).max(50).required(),
});
