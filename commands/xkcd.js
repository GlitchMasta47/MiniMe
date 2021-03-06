/* Eris Fixed */

const snekfetch = require('snekfetch')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const Logger = require('../util/Logger.js')

exports.run = (client, msg, args) => {
  if (args.length > 0) {
    if (isNaN(args[0])) return msg.channel.createMessage(':exclamation: │ The comic number must be a valid number.')
    if (Number(args[0]) < 1) return msg.channel.createMessage(':exclamation: │ The comic number must be greater than or equal to 1.')
    snekfetch.get('https://xkcd.com/info.0.json').then((result) => {
      const max = result.body.num
      if (Number(args[0]) > max) return msg.channel.createMessage(':exclamation: │ The comic number must be less than or equal to ' + max.toLocaleString() + '.')
      snekfetch.get('https://xkcd.com/' + Number(args[0]) + '/info.0.json').then((result) => {
        msg.channel.createMessage({
          embed: {
            title: result.body.safe_title,
            description: result.body.alt,
            color: getEmbedColor(client, msg),
            image: {
              url: result.body.img
            }
          }
        })
      }).catch((error) => {
        msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported.')
        Logger.error(`[xkcd.js] snekfetch error.`, error)
      })
    }).catch((error) => {
      msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported.')
      Logger.error(`[xkcd.js] snekfetch error.`, error)
    })
  } else {
    snekfetch.get('https://xkcd.com/info.0.json').then((result) => {
      const random = Math.floor(Math.random() * result.body.num) + 1
      snekfetch.get('https://xkcd.com/' + random + '/info.0.json').then((result) => {
        msg.channel.createMessage({
          embed: {
            title: result.body.safe_title,
            description: result.body.alt,
            color: getEmbedColor(client, msg),
            image: {
              url: result.body.img
            }
          }
        })
      }).catch((error) => {
        msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported.')
        Logger.error(`[xkcd.js] snekfetch error.`, error)
      })
    }).catch((error) => {
      msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported.')
      Logger.error(`[xkcd.js] snekfetch error.`, error)
    })
  }
}

exports.help = {
  name: 'xkcd',
  description: 'Fetches a random XKCD comic.',
  usage: 'xkcd [number]',
  fullDesc: 'Fetches a random XKCD comic, or the specified comic by number.',
  type: 'fun',
  status: 2,
  aliases: []
}
