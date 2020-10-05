const config = require('./../config/index');
const bcrypt = require('bcrypt');

module.exports = (req, user) => {
    console.log('User Help>', req);
    if (req.name)
        user.name = req.name;
    if (req.username)
        user.username = req.username;
    if (req.password)
        user.password = bcrypt.hashSync(req.password, config.saltRounds);
    if (req.email)
        user.email = req.email;
    if (req.phoneNumber)
        user.phoneNumber = req.phoneNumber;
    if (req.dob)
        user.dob = req.dob;
    if (req.role)
        user.role = req.role;
        
    return user;
}