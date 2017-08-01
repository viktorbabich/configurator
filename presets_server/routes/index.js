var express = require('express');
var router = express.Router();
var passport = require('passport');
const _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/logout', function(req, res, next) {
  req.logout();
  res.json({ error: null });
});

router.get('/getme', function(req, res, next) {
	if(req.isAuthenticated()) {
		res.json({user: req.user})
	} else {
		res.json({user: null})
	}
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

router.get('/account', ensureAuthenticated, function(req, res){
  res.json({ user: req.user });
});


router.get('/auth/google', passport.authenticate('google', { scope: ['openid', 'email'] }));

router.get('/auth/google/return', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3251/login', successRedirect: 'http://localhost:3251/login' }),
  (req, res) => res.redirect('/')
);

module.exports = router;

