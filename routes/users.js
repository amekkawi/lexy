var fs = require('fs');
var express = require('express');
var router = express.Router();

var userNames = {
  //lexy: 'geo',
  //andre: 'whiskers',
  //michael: 'fox'
};

// Read previously saved users and passwords
fs.readFile('./runtime/usernames.json', {encoding: 'utf8'}, function (err, data) {
  //if (err) throw err;
  //console.log(data);

  // if file exists, parse json and set to userNames
  if (!err) {
    userNames = JSON.parse(data);
    console.log('loaded usernames');
  }

  // otherwise, console.log that we couldn't find the data
  else {
    console.log
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/newlogin', function(req, res) {
  var newLoginName = req.query.newusername;
  var newPass = req.query.newpassword;

  // Log the object before making the change
  console.log('before', userNames);

  // Add new username
  userNames[newLoginName] = newPass;

  res.json({
    status: 'Received the new user info'
  });

  fs.writeFile('./runtime/usernames.json', JSON.stringify(userNames), function(err) {
    if (err) {
      console.log('whoops')
    }

  });

  // Log the object again to see the changes
  console.log('after', userNames);
});

router.get('/get', function(req, res) {
  res.json(userNames);
});

router.get('/whoami', function(req, res) {
  //setTimeout(function(){
  res.json({
    username: req.session.loggedInUser
  });
  //}, 1000);
});

router.get('/loggingout', function(req, res) {
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
      status: 'loginsuccessful'
    });
  }
  else {
    res.json({
      status: 'loginfailed',
      message: ''
    });
  }

});



module.exports = router;
