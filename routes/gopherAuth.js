const debug = require('debug')('gopher-express');
const express = require('express');
const router = express.Router();
const OAuth2 = require('simple-oauth2');
const config = require('../config');
let gopherClient = '';

const oauth2 = OAuth2.create({
  client: {
    id: config.clientId,
    secret: config.clientSecret
  },
  auth: {
    tokenHost: config.tokenHost,
    tokenPath: config.tokenPath,
    authorizePath: config.authorizePath,
  },
});

let state = Math.random().toString().substr(3,15);

const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: config.redirectUri,
  scope: config.scope,
  state: state
});

router.get('/login', (req, res) => {
  res
    .cookie('gopherState', state)
    .redirect(authorizationUri);
});

// Callback service parsing the authorization token and asking for the access token
router.get('/callback', (req, res) => {
  const code = req.query.code;
  const stateCookie = req.cookies.gopherState;
  const state = req.query.state;
  if(stateCookie !== state) {
    return res.send("Error: You may have been redirected to a different place from where you started, or your cookies are not being saved. (State mis-match)");
  }
  const options = {
    code: code,
    redirect_uri: config.redirectUri,
    client_id: config.clientId,
  };

  oauth2.authorizationCode.getToken(options, (error, result) => {
    if (error) {
      debug('Access Token Error', error.message);
      return res.json('Authentication failed');
    }
    
    const tokenDetails = oauth2.accessToken.create(result);
    debug('Access token is: ', tokenDetails.token.access_token);
    return res
            .cookie('gopherToken', tokenDetails.token.access_token)
            .redirect('/?welcome=1');
  });
});

module.exports = router;
