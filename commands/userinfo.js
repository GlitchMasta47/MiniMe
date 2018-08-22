const dateformat = require('dateformat')
const util = require('../util.js')
const funcs = require('../modules/functions.js')

const statuses = {
  online: '<:online:313956277808005120>',
  idle: '<:away:313956277220802560>',
  dnd: '<:dnd:313956276893646850>',
  offline: '<:offline:313956277237710868>'
}

exports.run = (client, message, args) => {
  util.resolveUser(client, args.length > 0 ? args.join(' ') : message.author.id).then((user) => {
    message.channel.send({
      embed: {
        title: user.username + '#' + user.discriminator,
        color: client.config.color,
        thumbnail: {
          url: user.displayAvatarURL
        },
        author: {
          icon_url: message.author.displayAvatarURL,
          name: `User Info │ Requested by ${message.author.username}#${message.author.discriminator}`
        },
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Status: 200'
        },
        timestamp: new Date(),
        fields: [
          {
            name: 'Created At:',
            value: dateformat(user.createdAt, 'mm/dd/yyyy hh:MM:ss TT'),
            inline: true
          },
          {
            name: 'Bot:',
            value: user.bot ? 'Yes' : 'No',
            inline: true
          },
          {
            name: 'ID:',
            value: user.id,
            inline: true
          },
          {
            name: 'Username:',
            value: user.username,
            inline: true
          },
          {
            name: 'Discriminator:',
            value: user.discriminator,
            inline: true
          },
          {
            name: 'Status:',
            value: `${statuses[user.presence.status]} │ ${funcs.toTitleCase(user.presence.status)}`,
            inline: true
          }
        ]
      }
    })
  }).catch(() => {
    message.channel.send(':exclamation: │ I was unable to find any users from that query.')
  })
}

exports.type = 'text'

exports.help = {
  name: 'userinfo',
  description: 'Gives info on the specified user.',
  usage: 'userinfo[ <user>]',
  fullDesc: 'Gives info on the specified user. If no user is given, info on the user running the command.',
  type: 'util'
}
