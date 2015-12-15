var express = require('express');
var router = express.Router();

var userNames = {
  lexy: 'geo',
  andre: 'whiskers',
  michael: 'fox'
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/newlogin', function(req, res) {
  var newLoginName = req.query.newusername;
  var newPass = req.query.newpassword;
  res.json({
    status: 'Received the new user info',






  //{userNames[newLoginName] = [newPass];}



  });
  console.log(newLoginName, newPass);
});

router.get('/get', function(req, res) {
  res.json(userNames);
});

module.exports = router;
