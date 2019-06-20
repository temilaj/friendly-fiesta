const express = require('express');
const router = express.Router();
const { isValidIntegerReading } = require('../helpers/util'); 
const { catchErrors } = require('../helpers/errorHandlers'); 

const  User = require('../models').User;
const  Temperature = require('../models').Temperature;
const  HeartRate = require('../models').HeartRate;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render({ title: 'Smart Assist' });
});

router.get('/test', function(req, res) {
  res.json({ title: 'Test Smart Assist' });
});

router.get('/activity', catchErrors(createActivity));

async function createActivity (req, res) {
  const { ip: ipAddress  } = req;
  const [user, created ] = await User.findOrCreate({where: {ipAddress}})
  if (!user) {
    return res.status(400).json({ error: 'user not created'});
  } else {
    const { temperature, heartRate } = req.query;
    console.log({ temperature, heartRate });
    let temperaturePromise;
    let heartRatePromise;
    if (temperature && isValidIntegerReading(temperature)) {
      temperaturePromise = Temperature.create({ value: temperature, userId: user.id});
    }
    if (heartRate && isValidIntegerReading(heartRate)) {
      heartRatePromise =  HeartRate.create({ value: heartRate, userId: user.id});
    }
    await Promise.all([temperaturePromise, heartRatePromise]);
    res.json({temperature, heartRate});
  } 
  
}

module.exports = router;
