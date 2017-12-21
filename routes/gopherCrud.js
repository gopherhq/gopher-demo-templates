const debug = require('debug')('gopher-express');
const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');
const util = require('util');
var gopherClient = '';

//populate gopherClient
router.use(function(req, res, next) {
  gopherClient = req.app.get('gopherClient');
  next();
});

router.get('/save-settings', (req, res) => {
  gopherClient.saveExtData({foo: 'bar'}, (error, response) => {
    debug(error || response);
    res.send (error || response);
  });
});

router.get('/get-settings', (req, res) => {
  gopherClient.getExtData((error, response) => {
    debug(error || response);
    res.send (error || response);
  });
});


module.exports = router;
