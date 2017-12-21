const debug = require('debug')('gopher-express');
const Gopher = require('gopherhq-node');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const gopherClient = new Gopher(config);
const _ = require('lodash');

module.exports = {
  requireLogin: function(req, res, next) {
    debug('login required');
    if (req.cookies.gopherToken) {
      debug("You are logged into Gopher", req.cookies.gopherToken);
      gopherClient.setAccessToken(req.cookies.gopherToken);
      req.app.set('gopherClient', gopherClient);
      return next();
    
    } else {
      res.redirect('/auth/login');
    }
  },
  
  validateWebhook: function (req, res, next) {
    const validateTimestamp = true;
    debug(req.headers['x-fut-signature'], req.headers['x-fut-timestamp'], req.rawBody);

    if (gopherClient.validateWebhook(req.headers['x-fut-signature'], req.headers['x-fut-timestamp'], req.rawBody, validateTimestamp)) {
      debug('Webhook validated!');
      let accessToken = _.get(req, 'extension.private_data.fut_access_token') || _.get(req, 'extension.public_data.fut_access_token');
      if (accessToken) {
        gopherClient.setAccessToken(accessToken);
        debug('The Gopher API client is authenticated and at your service, available withnin any webhook handler');        
      } else {
        debug('You can successfully send and process webhooks. The user has not yet authenticated their extension, so API calls cannot be made.');
      }
      return next();
      
    } else {
      return next('Webhook validation failed');
    }
  },
    
  jsTokenizer: function(req, res, next) {
    const jsFile = path.resolve(__dirname, '../public/_gopher.js');
    const stat = fs.statSync(jsFile);
    let loadedFile = fs.readFileSync(jsFile, 'utf-8');
    loadedFile = loadedFile.replace('{{ gopherBaseUrl }}', config.apiHost);
    res.set({
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true,
        'Content-Type': 'text/javascript',
        'Content-Length': stat.size
      });
    return res.send(loadedFile);
  }
}
