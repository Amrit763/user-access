var jwt = require('jsonwebtoken');
var config = require('./../config/index')
module.exports = function (req, res, next) {
    var token;
    if (req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
    }
    if (req.headers['authorization']) {
        token = req.headers['authorization'];
    }
    if (req, headers['token']) {
        token = req.headers['token']
    }
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return next(err)
            }
            console.log('decoded >>>>>', decoded);
            return next();
        })
    }
    else {
        next({
            msg: 'token not provided'
        })
    }
}