const joi = require('joi');

const signValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),  // Add parentheses for string, min, and max
        email: joi.string().email().required(),         // Add parentheses for string and email
        password: joi.string().min(4).max(100).required() // Add parentheses for string, min, and max
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Invalid request", error });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),         // Add parentheses for string and email
        password: joi.string().min(4).max(100).required() // Add parentheses for string, min, and max
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Invalid request", error });
    }
    next();
};

module.exports = {
    signValidation,
    loginValidation
};
