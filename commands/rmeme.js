const randomPuppy = require('random-puppy')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg) => {
  randomPuppy('memes').then(url => {
    msg.channel.send({
      embed: {
        color: getEmbedColor(msg),
        author: {
          icon_url: msg.author.displayAvatarURL,
          name: `Meme │ Requested by ${msg.author.username}#${msg.author.discriminator}`
        },
        image: {
          url: url
        },
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Status: 200'
        },
        timestamp: new Date()
      }
    })
  })
}

exports.help = {
  name: 'rmeme',
  description: 'Gets a random meme from Reddit.',
  usage: 'rmeme',
  fullDesc: 'Gets a random meme from Reddit.',
  type: 'img',
  status: 2
}
