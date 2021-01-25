const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
                case "string.regex":
                err.message = `Numer telefonu musi zawierać 9 cyfr`;
                break;
            case "number.empty":
                err.message = "Pole jest wymagane";
                break;
            default:
                break;
        }
    });
    return errors;
}

const kliSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow("")
        ,
    firstName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages)
        ,
    lastName: Joi.string()
        
        .min(2)
        .max(60)
        .required()
        .error(errMessages)
        ,
    nrTel: Joi.string()
        .regex(/^[0-9]{9}$/)
        .messages({'string.pattern.base': `Numer telefonu musi posiadać 9 cyfr`})
        // .integer()
        .required()
        .error(errMessages)
        ,
    uwagi: Joi.string()
        .max(300)
        .optional()
        .allow("")
        .error(errMessages)
        
});



module.exports = kliSchema;