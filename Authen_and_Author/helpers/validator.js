const joi = require("joi")


const validation = joi.object({
    firstName: joi.string().min(3).max(12),
    lastName: joi.string().min(3).max(12),
    email: joi.string().email({minDomainSegments: 2,tlds:{allow:["com",'net', "ng"]}}),
    Number: joi.string().pattern(new RegExp('^[0-9]')).min(5).max(11),
    password: joi.string().pattern(new RegExp('^[a-zA-z0-9]{3,30}$'))
})

module.exports = validation