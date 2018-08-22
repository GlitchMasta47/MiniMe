const snekfetch = require('snekfetch')

exports.run = (client, msg) => {
  snekfetch.get('https://dog-api.kinduff.com/api/facts').then(res => {
    msg.channel.send(res.body.facts[0])
  }).catch(err => {
    msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported.')
    client.rollbar.error(`[dogfact.js] REST call failed: ${err}`)
  })
}

exports.help = {
  name: 'dogfact',
  description: 'Gets a random dog fact.',
  usage: 'dogfact',
  fullDesc: 'Gets a random dog fact.',
  type: 'fun'
}
