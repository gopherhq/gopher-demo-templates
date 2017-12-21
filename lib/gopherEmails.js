const _ = require('lodash');

module.exports.unrecognizedEvent = function (webhook) {
  const command = _.get(webhook, 'command.params[0]', null);
  return {
        version: 1,
        response: [
          {
            type: "email",
            subject: "Gopher wasn't sure what to do with this email",
            body: [
              {
                type: 'html',
                text: `The webhook event: <strong>${webhook.event}</strong>.` + (command ? `<p>The command: <strong>${command}</strong></p>` : '')
              }
            ]
          }
        ]
        }
}