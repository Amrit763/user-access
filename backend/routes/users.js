var express = require('express');
var router = express.Router();
var UserModule = require('../models/user.module')
var userHelp = require('../helper/userhelp')
// const { update } = require('./../models/user.module');

router.get('/', function (req, res, next) {
  UserModule.find({})
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
      user.updatedBy = 'ram'
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
