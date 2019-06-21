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
router.get('/temperature', catchErrors(getBodyTemperature));
router.get('/heartrate', catchErrors(getHeartRate));

function createActivity (req, res) {
  const { ip: ipAddress  } = req;
  return User.findOrCreate({where: {ipAddress}})
  .spread(async (user, created) => {
    const { temperature, heartRate } = req.query;
    console.log({ temperature, heartRate });
    let temperaturePromise;
    let heartRatePromise;
    if (temperature && isValidIntegerReading(temperature)) {
      temperaturePromise = Temperature.create({ value: temperature, UserId: user.id});
    }
    if (heartRate && isValidIntegerReading(heartRate)) {
      heartRatePromise =  HeartRate.create({ value: heartRate, UserId: user.id});
    }
    await Promise.all([temperaturePromise, heartRatePromise]);
    res.json({temperature, heartRate});
  }).catch(error => next(error))
} 

async function getBodyTemperature (req, res) {
  const { ip: ipAddress  } = req;
  return User.findAll({
    limit: 1,
    where: {ipAddress},
    order: [ [ 'createdAt', 'DESC' ]]
  }).then((users) => {
    console.log('users')
    console.log(users[0].id)
    if (!users.length > 0) {
      return res.status(400).json({ error: 'user not found'});
    } else {
      Temperature.findAll({
        where: { userId: users[0].id },
        order: [ [ 'createdAt', 'DESC' ]]
      }).then(temperatures => {
        return res.json({temperatures});
      });
    } 
  });
}

async function getHeartRate (req, res) {
  const { ip: ipAddress  } = req;
  return User.findAll({
    limit: 1,
    where: {ipAddress},
    order: [ [ 'createdAt', 'DESC' ]]
  }).then((users) => {
    console.log('users')
    console.log(users[0].id)
    if (!users.length > 0) {
      return res.status(400).json({ error: 'user not found'});
    } else {
      HeartRate.findAll({
        where: { userId: users[0].id },
        order: [ [ 'createdAt', 'DESC' ]]
      }).then(heartRates => {
        return res.json({heartRates});
      });
    } 
  });
}

module.exports = router;
