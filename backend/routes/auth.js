var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
var config = require('./../config')
var userModel = require('./../models/user.module')
var userHelp = require('./../helper/userHelp');
const salt = bcrypt.genSaltSync(config.saltRounds);



router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res, next) => {
  userModel.findOne({
    username: req.body.username
  })
    .exec((err, user) => {

      if (err) {
        return next(err);
      }
      if (user) {
        isMatched = bcrypt.compareSync(req.body.password, user.password);
        if (isMatched) {
          // json web token
          var token = jwt.sign({ name: user.username, id: user._id }, config.secret);
          res.json({
            token: token,
            user: user
          });
          // res.json({
          //   user: user
          // })
        }
        else {
          res.json({
            msg: "Password didnt match"
          })
        }
      }
    })
})

router.post('/register', (req, res, next) => {

  var obj = JSON.parse(JSON.stringify(req.body));
  var newUser = new userModel({});

  if (req.body.name)
    newUser.name = req.body.name;
  if (req.body.address)
    newUser.address = req.body.address;
  if (req.body.email)
    newUser.email = req.body.email;
  if (req.body.username)
    newUser.username = req.body.username;
  if (req.body.phoneNumber)
    newUser.phoneNumber = req.body.phoneNumber;
  if (req.body.password)
    newUser.password = bcrypt.hashSync(req.body.password, salt);
  if (req.body.role)
    newUser.role = req.body.role;
  if (req.body.dob)
    newUser.dob = req.body.dob;

  newUser.save(function (err, user) {
    if (err) {
      return next(err);
    }
    res.json(user)
    console.log('From authentication >>>>>>>>', user)
  })
})


module.exports = router;


