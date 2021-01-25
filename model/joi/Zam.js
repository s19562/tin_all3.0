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
            case "any.empty":
                err.message = `Pole jest wymagane`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const zamSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow("")
        ,
    ilosc: Joi.string()
        .regex(/[0-9]*/)
        .messages({'string.pattern.base': `Ilosc musi posiadać format np 20 `})
        .required()
        .error(errMessages)
        ,
    cenaAll: Joi.string()
        .required()
        .regex(/[0-9]*.[0-9]{1,2}/)
        .messages({'string.pattern.base': `Cena musi posiadać format np 1.20 `})
        .error(errMessages)
        ,
    dataZam: Joi.string()
        .regex(/^([0-9]{4}-[0-9]{2}-[0-9]{2}){1}/)
        .messages({'string.pattern.base': `Data musi posiadac format np 2020-09-01`})
        .max(10)
        .required()
        .error(errMessages)
        ,
    rabat: Joi.string()
        .regex(/^0*([0-9]|[1-8][0-9]|9[0-9]|100)$/)
        .messages({'string.pattern.base': `Rabat musi byc liczbą od 0 do 100`})
        .optional()
        .error(errMessages)
        ,
    uwaga: Joi.string()
        .max(100)
        .optional()
        .allow("")
        .error(errMessages)   
        ,
    klientId: Joi.string()
    .required()
    .regex(/[0-9]*/)
    .error(errMessages)
    ,
    wyrobId: Joi.string()
    .required() 
    .regex(/[0-9]*/)
    .error(errMessages)
        
});



module.exports = zamSchema;