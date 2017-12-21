const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require('../config.js');
const gopherUtils = require('../lib/gopherUtils');
const _ = require('lodash');
const gopherSalesforce = require('../lib/gopherSalesforce');
const gopherGithub = require('../lib/gopherGithub');
const gopherProducthunt = require('../lib/gopherProducthunt');
const gopherEmails = require('../lib/gopherEmails');

// Validates your webhook and populates the Gopher API client
router.use(gopherUtils.validateWebhook);

router.post('/', function(request, response) {
  
  let webhook = request.body;
  
  switch(webhook.event) {
      
    case "command.received": 
      switch(webhook.command.params[0]) {
        case "salesforce":
          return response.send(gopherSalesforce.handleDemo(webhook));
        break;
        case "github":
          return response.send(gopherGithub.handleDemo(webhook));
        break;
        case "producthunt":
          return response.send(gopherProducthunt.handleDemo(webhook));
        break;
        default:
          return response.send(gopherEmails.unrecognizedEvent(webhook));
        break;
      }
    break;
    default: 
        response.send({
        version: 1,
        response: [
          {
            type: "email",
            subject: "Gopher isn't sure what to do with this event",
            body: [
              {
                type: 'html',
                text: `The mystery event was: <strong>${webhook.event}</strong>`
              }
            
            ]
          }
        ]
        });
    break;
    }
  
});


module.exports = router;