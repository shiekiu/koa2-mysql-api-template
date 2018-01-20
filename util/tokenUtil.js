'use strict';
const jwt = require('jsonwebtoken')
const secret = require('../config/secret.json')
const generateToken = (user) => {
    const userToken = {
        id: user.id,
        name: user.name
    }
    return jwt.sign(userToken, secret.sign, {expiresIn: '2h'})
}
module.exports = {
    generateToken
}