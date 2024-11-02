import Joi from "joi"

const createConctactValidation = Joi.object({
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).optional(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional(),
});

const getContactValidation = Joi.number().positive().required();

const updateConctactValidation = Joi.object({
    id: Joi.number().positive().required(),
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).optional(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional(),
});

const searchContactValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10), 
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional()
});

export {
    createConctactValidation,
    getContactValidation,
    updateConctactValidation,
    searchContactValidation
}