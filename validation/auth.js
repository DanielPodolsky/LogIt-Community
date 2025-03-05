import joi from "joi";

export const userAuthentication = joi.object({
  username: joi.string().min(2).max(50).required(),
  email: joi.string().min(5).max(50).email().required(),
  password: joi.string().min(5).max(1024).required(),
});

export const userLogin = joi.object({
  email: joi.string().min(5).max(50).email().required(),
  password: joi.string().min(5).max(1024).required(),
});
