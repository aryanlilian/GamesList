const Joi = require('@hapi/joi');

// User model register validation
const registerValidation = (data) => {
    const userRegisterSchema = Joi.object({
        username: Joi.string().min(8).required(),
        email: Joi.string().min(5).email().required(),
        fullName: Joi.string().required(),
        password: Joi.string().min(8).required(),
        password2: Joi.string().min(8).required()
    });
    return userRegisterSchema.validate(data);
}

// User model login validation
const loginValidation = (data) => {
    const userRegisterSchema = Joi.object({
        username: Joi.string().min(8).required(),
        password: Joi.string().min(8).required()
    });
    return userRegisterSchema.validate(data);
}

module.exports = {
    registerValidation,
    loginValidation
}
