var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var config = require('./../config')
var userModel = require('./../models/user.module')
var userHelp = require('./../helper/userHelp');

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
          var token = jwt.sign({ name: user.username, id: user._id }, config.secret)
          res.json({
            token: token,
            user: user
          });
        }
      }
    })
})

router.post('/register', (req, res, next) => {
  var user = new userModel;
  user = userHelp(req.body, user);

  user.save((err, user) => {
    if (err) {
      console.log('err>', err);
      return next(err);
    }
    res.json(user);
  })
})


module.exports = router;


