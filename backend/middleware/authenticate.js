var jwt = require('jsonwebtoken');
var config = require('./../config/index');
const { findById } = require('./../models/user.module');
var UserModel = require("./../models/user.module")

module.exports = function (req, res, next) {
    var token;
    if (req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
    }
    if (req.headers['authorization']) {
        token = req.headers['authorization'];
    }
    if (req.headers['token']) {
        token = req.headers['token']
    }
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {

            if (err) {
                return next(err)
            }
            UserModel.findById(decoded.id,function(err,user){
                if(err){
                    return next(err);
                }
                if(user){
                    req.loggedInUser =user;
                    return next();
                }
                else{
                    next({
                        msg: 'token user is removed from system'
                    })
                }
            })
            // console.log('decoded >>>  ', decoded);
            // req.loggedInUser = decoded;
            // return next();
        })
    }
    else {
        next({
            msg: 'token not provided'
        })
    }
}