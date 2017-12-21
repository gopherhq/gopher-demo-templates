require('dotenv').config();
const debug = require('debug')('gopher-express');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// app.get('/', (req, res) => res.send('hi'));
app.use(bodyParser.json({
  verify: function(req, res, buf, encoding) {
    req.rawBody = buf.toString();
  }
}));
app.use(bodyParser.json());
app.use(cookieParser());

const gopherUtils = require('./lib/gopherUtils');
const gopherAuth = require('./routes/gopherAuth');
app.use('/auth', gopherAuth);
const gopherCrud = require('./routes/gopherCrud');
app.use(gopherCrud);


/**
 * 
 * Process and respond to webhooks in /routes/gopherWebhooks.js
 * 
*/
const webhooks = require('./routes/gopherWebhooks');
app.use('/webhooks', webhooks);


/**
 * 
 * Edit public/index.html to update the settings page
 * 
*/
app.get('/', gopherUtils.requireLogin, (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.use('/gopher.js', gopherUtils.requireLogin, gopherUtils.jsTokenizer);  // automatically populated with config values


app.use(express.static('public'));

const listener = app.listen(process.env.PORT || 3011, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
