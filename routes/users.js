const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');

router.route('/register')
  .get(users.renderRegister)
  .post(catchAsync(users.register))

router.route('/login')
  .get(users.renderLogin)
  .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', failureMessage: true, keepSessionInfo: true}), users.login)

// router.get('/logout', (req, res) => {
//     req.logout();
//     req.flash('success', 'Goodbye!');
//     res.redirect('/campgrounds');
// })

router.get("/logout", users.logout);

module.exports = router;