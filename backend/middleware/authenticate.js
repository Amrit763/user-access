var jwt = require('jsonwebtoken');
var config = require('./../config/index')
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
        jwt.verify(token, config.secret, function (err, done) {

            if (err) {
                return next(err)
            }
            // console.log('decoded >>>>>', decoded);
            // user haru update vaye pachi decoded ma puranai aaucha so updated aauna lai yo gareko 
            // UserModel.findById(decoded.id, function (err, user) {
            //     if (err) {
            //         return next(err);
            //     }
            //     console.log('useris>>> ',user)
            //     if(user){
            //     req.loggedInUser = user;
            //         console.log('authenticate batai loggedInUser>>>',req.loggedInUser)
            //         return next();
            //     }
            //     else{
            //         next({
            //             msg : "Token user has been already removed"
            //         })
            //     }
            // })
            // suruma yo garr
            // req.loggedInUSer = decoded;
            // return next();


            UserModel.findById(done.id)
                .exec((err, user) => {
                    if (err) {
                        return next(err);
                    }
                    if (user) {
                        req.loggedInUser = user;
                        return next();
                    } else {
                        return next({
                            message: 'User with token is removed from system'
                        })
                    }
                })

        })
    }
    else {
        next({
            msg: 'token not provided'
        })
    }
}