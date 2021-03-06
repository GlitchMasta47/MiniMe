const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const snekfetch = require('snekfetch')
const getBigAvatar = require('../util/getBigAvatar.js')

exports.run = (client, msg, args) => {
  msg.channel.createMessage('<a:typing:393848431413559296> │ Generating...').then(message => {
    if (args[0]) {
      resolveUser(client, args.join(' ')).then(user => {
        snekfetch.get(`https://triggered-api.tk/api/v2/blurple?url=${getBigAvatar(user)}`).set({ Authorization: client.config.apis.triggered }).then(res => {
          message.delete()
          msg.channel.createMessage({
            embed: {
              author: {
                name: `${user.username} has been blurplefied!`,
                icon_url: msg.author.avatarURL
              },
              footer: {
                text: 'Status: 200',
                icon_url: client.user.avatarURL
              },
              timestamp: new Date(),
              color: getEmbedColor(client, msg),
              image: {
                url: 'attachment://blurple.png'
              }
            }
          }, { file: res.body, name: 'blurple.png' })
        })
      })
    } else {
      snekfetch.get(`https://triggered-api.tk/api/v2/blurple?url=${getBigAvatar(msg.author)}`).set({ Authorization: client.config.apis.triggered }).then(res => {
        message.delete()
        msg.channel.createMessage({
          embed: {
            author: {
              name: `${msg.author.username} has been blurplefied!`,
              icon_url: msg.author.avatarURL
            },
            footer: {
              text: 'Status: 200',
              icon_url: client.user.avatarURL
            },
            timestamp: new Date(),
            color: getEmbedColor(client, msg),
            image: {
              url: 'attachment://blurple.png'
            }
          }
        }, { file: res.body, name: 'blurple.png' })
      })
    }
  })
}

exports.help = {
  name: 'blurple',
  description: 'Blurplefy someone!',
  usage: 'blurple [user]',
  fullDesc: 'Blurplefy someone!',
  type: 'imgen',
  status: 2,
  aliases: []
}
