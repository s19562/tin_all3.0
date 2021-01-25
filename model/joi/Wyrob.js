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
          
            default:
                break;
        }
    });
    return errors;
}

const wyrSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow("")
        ,
    name: Joi.string()
        .min(2)
        .max(200)
        .required()
        .error(errMessages)
        ,
    cenaSz: Joi.string()
    .required()
    .regex(/[0-9]*.[0-9]{1,2}/)
    .messages({'string.pattern.base': `Cena musi posiadać format np 1.20 `})
    .error(errMessages)
        
});



module.exports = wyrSchema;