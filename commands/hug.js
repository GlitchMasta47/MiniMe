/* Eris Fixed */

const snek = require('snekfetch')
const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg, args) => {
  resolveUser(client, args.join(' ')).then(user => {
    snek.get('https://nekos.life/api/hug').then(res => {
      msg.channel.createMessage({
        embed: {
          author: {
            icon_url: msg.author.avatarURL,
            name: `${msg.author.username} gave ${user.username} a hug!`
          },
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: 'Status: 200'
          },
          image: {
            url: res.body.url
          },
          color: getEmbedColor(client, msg)
        }
      })
    }).catch(err => {
      msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported.')
      client.rollbar.error('[hug.js] Error getting image from nekos.life: ' + err)
    })
  }).catch(err => {
    msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported.')
    client.rollbar.error('[hug.js] Error resolving user: ' + err)
  })
}

exports.help = {
  name: 'hug',
  description: 'Hug a user.',
  usage: 'hug <user>',
  fullDesc: 'Hug a user.',
  type: 'rp',
  status: 2,
  aliases: []
}
