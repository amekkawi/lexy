var express = require('express');
var router = express.Router();

var userNames = {
  lexy: 'geo',
  andre: 'whiskers',
  michael: 'fox',
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lexy' });
});

//the /courses below is looking for /courses in the url, not in any directory of mine. I set it.
//Also, the res.render knows where to look due to the app.js file, in which I told it on lines 14 &15
//where it should look for views.
router.get('/findacourse', function(req, res) {
  res.render('findacourse');
});

router.get('/coursecatalog', function(req, res) {
  res.render('coursecatalog');
});

router.get('/courseinformation/:guid', function(req, res) {
  var guidValue = req.params.guid;
  //the second argument below, is a plain object, and this is the way to pass data on to the template (the ejs file)
  res.render('courseinformation', {
    guid: guidValue
  });
});

router.get('/studentlogin', function(req, res) {
  res.render('studentlogin');
});

router.get('/whoami', function(req, res) {
  res.json({
    username: req.session.loggedInUser
  });
});

router.get('/logout', function(req, res) {
  // Record what the username was before we clear it
  var oldUsername = req.session.loggedInUser;

  // Clear the username so they are no longer logged in
  req.session.loggedInUser = undefined;

  res.json({
    username: oldUsername
  });
});

router.get('/login', function(req, res) {
  var login = req.query.username;
  var pass = req.query.password;

  if (typeof login !== 'string') {
    res.json({
      status: 'fail',
      message: 'the "login" query param is required!'
    });
    return;
  }

  console.log(login, pass);
  var correctPass = userNames[login];
  console.log(correctPass);

  //var usernameExists = userNames.hasOwnProperty(login);

  if (typeof correctPass === 'string' && pass === correctPass) {
    // record who is logged in for the session
    req.session.loggedInUser = login;

    res.json({
      status: 'success'
    });
  }
  else {
    res.json({
      status: 'fail',
      message: ''
    });
  }

});


module.exports = router;
