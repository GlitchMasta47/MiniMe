/* Eris Fixed */

const snekfetch = require('snekfetch')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg) => {
  snekfetch.get('http://random.birb.pw/tweet/').then(res => {
    msg.channel.createMessage({
      embed: {
        author: {
          icon_url: msg.author.avatarURL,
          name: `Bird │ Requested by ${msg.author.username}#${msg.author.discriminator}`
        },
        color: getEmbedColor(client, msg),
        image: {
          url: `https://random.birb.pw/img/${res.body}`
        },
        timestamp: new Date(),
        footer: {
          text: 'Status: 200',
          icon_url: client.user.avatarURL
        }
      }
    })
  }).catch((error) => {
    msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported')
    client.rollbar.error(`[badmeme.js] snekfetch error: ${error}`)
  })
}

exports.help = {
  name: 'bird',
  description: 'Gets a random bird picture.',
  usage: 'bird',
  fullDesc: 'Gets a random bird picture.',
  type: 'img',
  status: 2,
  aliases: []
}
