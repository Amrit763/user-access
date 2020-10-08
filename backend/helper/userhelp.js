const config = require('./../config/index');
const bcrypt = require('bcrypt');
const { NotExtended } = require('http-errors');

module.exports = (req, user) => {
    var check;
    console.log('User Help>', req);
    if (req.name)
        user.name = req.name;
    if (req.username)
        user.username = req.username;

    if (req.password) {
        if (req.confirmPassword==req.password) {
            user.password = bcrypt.hashSync(req.password, config.saltRounds);
        } else {
            console.log('password and confirm password didnt match')
        }
    }
    if (req.email)
        user.email = req.email;
    if (req.phoneNumber) {
        var phn = /^\(?9\)?(\d{9})$/
        var validate = phn.test(req.phoneNumber);
        if (validate) {
            user.phoneNumber = req.phoneNumber
        } else {

            console.log('Phone number invalidate')
        }

    }
    if (req.dob)
        user.dob = req.dob;
    if (req.role)
        user.role = req.role;

    return user;
}