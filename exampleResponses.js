var express = require('express');
var app = express();

// Todoist
app.post('/todoist_on_complete', (req, res) => {
  console.log('on_complete webook fired');
  let body = {
    response: [{
      'body': [
        {
          type: 'html',
          "text": `<h1>
                  <img src="https://cdn.glitch.com/5d7c2dda-808c-4712-95d2-17f5ff97a4e2%2Ftodoist-icon?1496726907652" width="30px" align="absmiddle">
                  Taco Mania Proposal</h1>`,
        },
        {
          type: 'button',
          text: 'Complete',
          'url': 'https://localhost:3000/url'
        },
        {
          type: 'button',
          text: 'View In Todoist',
          'url': 'https://localhost:3000/url'
        },
        {
          type: 'html',
          text: '<table border=0" style="clear: both"><tr><td><h4>NOTES</h4><p>Whatever I emailed goes here, along with additional notes I added in ToDoist. https://console.aws.com</p></td></tr></table>',
        }
      ]
    }]
  };
  return res.json(body);
      
});



// Salesforce
app.post('/salesforce_on_complete', (req, res) => {
  console.log('on_complete webook fired');
  let body = {
    followup: {
      'body': [
        {
          type: 'html',
          text: `<h4 style="clear: both"><img src="https://cdn.glitch.com/5d7c2dda-808c-4712-95d2-17f5ff97a4e2%2Fsalesforce-icon.png?1496727853649" width="30px" align="absmiddle"> SALESFORCE FOLLOWUP</h4>`
        },
        {
          type: 'html',
          text: `<h1>
                  Bill S. Ted Esquire</h1>
                  <p>Co-Founcer <span style="color: #ccc">at</span> Wyld Stallyns</p>
                  `,
        }, 
        {
          type: 'html',
          text: `<h4 style="clear: both">CONTACT INFO</h4>`
        },
        {
          type: 'button',
          text: 'Mobile: 408-867-5309',
          'url': 'tel:4088675309'
        },
        {
          type: 'button',
          text: 'Desk: 408-867-5308',
          'url': 'tel:4088675309'
        },
        {
          type: 'button',
          text: 'Email: bill@wyldstallyns.com',
          'url': 'mailto:bill@wyldstallyns.com'
        },
        {
          type: 'html',
          text: `<h4 style="clear: both">ACTIONS</h4>`
        },
        {
          type: 'button',
          text: 'View on Salesforce',
          'url': 'https://localhost:3000/url'
        },
        {
          type: 'button',
          text: 'Complete Activity',
          'url': 'mailto:action+49aj39a94@followupthen.com'
        },
        {
          type: 'button',
          text: 'Create Opportunity',
          'url': 'mailto:action+49aj39a94@followupthen.com'
        },
        {
          type: 'html',
          text: `<table border=0" style="clear: both">
                    <tr><td>
                      <h4>ACTIVITY</h4>
                      <p>June 3rd, 1987. By Joe Schmoe – Interested in adhesives.</p>
                      <p>May 26th, 1987. By Jane Doe – Spoke with them at a Circle K. Preparing for a large project. Check back in a few days.</p>
                    </td></tr>
                </table>`,
        },

      ]
    }
  };
  return res.json(body);
      
});