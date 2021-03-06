/* Eris Fixed */

const snekfetch = require('snekfetch')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg) => {
  snekfetch.get('https://animals.anidiots.guide/lion').then(res => {
    msg.channel.createMessage({
      embed: {
        author: {
          icon_url: msg.author.avatarURL,
          name: `Lion │ Requested by ${msg.author.username}#${msg.author.discriminator}`
        },
        color: getEmbedColor(client, msg),
        timestamp: new Date(),
        image: {
          url: res.body.link
        },
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Status: 200'
        }
      }
    })
  }).catch((error) => {
    msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported')
    client.rollbar.error(`[badmeme.js] snekfetch error: ${error}`)
  })
}

exports.help = {
  name: 'lion',
  description: 'Gets a random lion picture.',
  usage: 'lion',
  fullDesc: 'Gets a random lion picture.',
  type: 'img',
  status: 2,
  aliases: []
}
