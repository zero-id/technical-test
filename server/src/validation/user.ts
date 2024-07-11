import * as joi from "joi";

export const registerSchema = joi.object({
    name: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required(),
})


export const loginSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
})