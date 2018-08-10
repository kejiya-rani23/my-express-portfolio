var express = require('express');
var router = express.Router();
var data = require('../mydata.json');

router.get('/', function (req, res, next) {
  res.render('index', { layout: 'layout-index', navHome: true });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About', showFooter: true, navAbout: true });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact', showFooter: true, navContact: true });
});

router.post('/contact', function(req, res, next) {
  // read the values passed from the ui
  var data = req.body;
  console.log(JSON.stringify(data));

  res.render('confirm', { title: 'Contact', showFooter: true, navContact: true, data: data });
});

router.get('/resume', function(req, res, next) {
  res.redirect('/kejiya-rani-resume.pdf'); 
});

router.get('/signin', function(req, res, next) {
  res.render('admin/signin', { layout: 'layout-signin' });
});

router.post('/signin', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  // validate inputs
  req.checkBody('email', 'Email is required').
      notEmpty().withMessage('Email can not be empty').
      isEmail().withMessage('Please enter a valid email');
  req.checkBody('password', 'Password is required').notEmpty();
  var errors = req.validationErrors();
  console.log('---- '+ JSON.stringify(errors));
  if (errors) {
    var messages = [];
    errors.forEach(function(error) {
        messages.push(error.msg);
    });
    res.render('admin/signin', {layout:'layout-signin', error: messages.length > 0,messages: messages});
  }else{   
    // authenticate the user details
    if(email && email !== '' && password && password !== '' &&
        email === data.user.email && password === data.user.password){
      // create the session
      req.session.isAuthenticated = true;
      req.session.user = {'email': email};
      res.locals.user = {'email': email};

      res.render('admin/dashboard', { 
        layout: 'layout-admin', 
        title: 'Admin Dashboard',
        navDashboard: true
      });
    }else{
      var message = "Invalid email or password";
      res.render('admin/signin', { layout: 'layout-signin', error: true, messages:[message] });
    }
  }
});

router.get('/signout', function(req, res, next) {
  req.session.isAuthenticated = false;
  delete req.session.user;
  res.redirect('/signin'); 
});
module.exports = router;