const Joi = require("@hapi/joi");

const registerValidation = data =>{

    const schema = Joi.object({
        name: Joi.string().max(60).required(),
        email: Joi.string().max(255).min(6).required().email(),
        phone: Joi.string().min(8).max(20).required(),
        password: Joi.string().min(8).required(),
      });
      return schema.validate(data)
}


const loginValidation = data =>{

    const schema = Joi.object({
        
        email: Joi.string().max(255).min(6).required().email(),
      
        password: Joi.string().min(8).required(),
      });
      return schema.validate(data)
}

module.exports.registerValidation = registerValidation;

module.exports.loginValidation = loginValidation;