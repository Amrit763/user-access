var express = require('express');
var router = express.Router();
var UserModule = require('../models/user.module')
var userHelp = require('../helper/userhelp')
var config = require('./../config')
var bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(config.saltRounds);



router.get('/', function (req, res, next) {
  console.log("Req.loggined user >>> ", req.loggedInUSer)
  UserModule.find({}
    // ,{
    //   username: 1,
    //   _id:0
    // }
  )
    .sort({
      _id: -1
    })
    .exec(function (err, user) {
      if (err) {
        return next(err);
      }
      res.json(user)
    })
})

router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  UserModule.findById(id, function (err, user) {
    if (err) {
      return next(err);
    }
    res.json(user);
  })
})
router.delete('/:id', function (req, res, next) {
  var id = req.params.id;
  UserModule.findById(id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      user.remove(function (err, removed) {
        if (err) {
          return next(err);
        }
        res.json(removed);
      })
    }
    else {
      next({
        msg: 'User not found '
      })
    }
  })
})
router.put('/:id', function (req, res, next) {
  var id = req.params.id;
  UserModule.findById(id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      user = userHelp(req.body, user);
      if (req.body.password)
        user.password = bcrypt.hashSync(req.body.password, salt);
      // user.updatedBy = user.modifier garera banauna ni milcha i.e: utaa kasle login gareko tesko user name diyera k 
      console.log('ehefe >>>> ',req.loggedInUSer)
      user.updatedBy = req.loggedInUSer.username;
      // user.updatedBy = "Ram"
      user.save(function (err, done) {
        if (err) {
          return next(err);
        }
        res.json(done)
      })
    }
    else {
      next({
        msg: 'User not found'
      })
    }
  })
})

module.exports = router;
