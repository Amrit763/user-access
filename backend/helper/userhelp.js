const config = require('./../config/index');
var bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(config.saltRounds);
// const { NotExtended } = require('http-errors');

module.exports = (req, user) => {
    var check;
    // console.log('User Help>', req);
    if (req.name)
        user.name = req.name;
    if (req.username)
        user.username = req.username;

    if (req.password) {
        user.password = bcrypt.hashSync(req.password, config.saltRounds);
        // user.password = req.password
    }
    if (req.email)
        user.email = req.email;
    if (req.address)
        user.address = req.address
    if (req.phoneNumber) {
        // var phn = /^\(?9\)?(\d{9})$/
        // var validate = phn.test(req.phoneNumber);
        // if (validate) {
        //     user.phoneNumber = req.phoneNumber
        // } else {

        //     console.log('Phone number invalidate')
        // }
        user.phoneNumber = req.phoneNumber
    }
    if (req.dob)
        user.dob = req.dob;
    if (req.role)
        user.role = req.role;

    return user;
}