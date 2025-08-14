import * as joi from "joi";

export const signupSchema = joi.object({
  username: joi.string().min(6).max(50).required(),
  email: joi
    .string()
    .min(6)
    .max(50)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"))
    .email({
      tlds: { allow: ["com", "net"] },
    }),
  password: joi.string().required(),
});

export const signinSchema = joi.object({
  email: joi
    .string()
    .min(6)
    .max(50)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"))
    .email({
      tlds: { allow: ["com", "net"] },
    }),
  password: joi.string().required(),
});
