import Joi from 'joi';

export const signupValidation = (req, res, next) => {
    const signupSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(4).max(100).required(),
    email: Joi.string().email().required(),
    mobile: Joi.number().optional(),
    address: Joi.string().optional(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    role: Joi.string().valid("admin", "event_manager", "visitor", "sponsor", "stall_owner", "award_applicant").optional()
    });

    const { error } = signupSchema.validate(req.body); // Validate req.body against the schema
    if (error) {
        return res.status(400).json({ error: error.details[0].message }); // Send validation error response
    }
    next(); // Proceed to the next middleware or route handler
};

export const loginValidation = (req, res, next) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    }); 
    const { error } = loginSchema.validate(req.body); // Validate req.body against the schema
    if (error) {
        return res.status(400).json({ error: error.details[0].message }); // Send validation error response
    }
    next(); // Proceed to the next middleware or route handler
};
