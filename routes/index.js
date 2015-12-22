var express = require('express');
var router = express.Router();

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
  //the second argument below, is a plain object, and this is the way to pass data (you're telling it which json file to refer to!) on to the template (the ejs file)
  res.render('courseinformation', {
    coursenumber: req.params.guid,
  });
});

router.get('/studentlogin', function(req, res) {
  res.render('studentlogin');
});

router.get('/shoppingcart', function(req, res) {
  res.render('shoppingcart');
});


module.exports = router;
