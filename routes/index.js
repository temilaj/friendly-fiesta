var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Smart Assist' });
});

router.get('/test', function(req, res) {
  res.json({ title: 'Test Smart Assist' });
});

router.get('/activity', function(req, res) {
  const { body, query } = req;
  console.log({body});
  console.log({query});
  const { temperature, heartRate } = req.query;
  console.log({temperature, heartRate});
  res.json({temperature, heartRate});
});

module.exports = router;
