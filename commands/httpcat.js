const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg, args) => {
  msg.channel.send({
    embed: {
      authora: {
        icon_url: msg.author.displayAvatarURL,
        name: `HTTP Cat │ Requested by ${msg.author.username}#${msg.author.discriminator}`
      },
      timestamp: new Date(),
      footer: {
        text: `Status: 200`,
        icon_url: client.user.avatarURL
      },
      color: getEmbedColor(msg),
      image: {
        url: `https://http.cat/${args[0]}.jpg`
      }
    }
  })
}

exports.help = {
  name: 'httpcat',
  description: 'Get a cat for any HTTP code!',
  usage: 'httpcat <num>',
  fullDesc: 'Get a cat for any HTTP code!',
  type: 'img',
  status: 2
}