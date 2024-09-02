import Joi from "joi"

const createConctactValidation = Joi.object({
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).optional(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional(),
});

const getContactValidation = Joi.number().positive().required();

export {
    createConctactValidation,
    getContactValidation
}