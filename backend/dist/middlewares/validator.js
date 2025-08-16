import Joi from "Joi";
export const signupSchema = Joi.object({
    username: Joi.string().min(6).max(50).required(),
    email: Joi
        .string()
        .max(50)
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"))
        .email({
        tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().required(),
});
export const signinSchema = Joi.object({
    email: Joi
        .string()
        .min(6)
        .max(50)
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"))
        .email({
        tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().required(),
});
