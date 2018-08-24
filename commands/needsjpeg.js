var Jimp = require('jimp')
const util = require('../util.js')
const Discord = require('discord.js')

exports.run = (client, msg, args) => {
  util.resolveUser(client, args.join(' ')).then(user => {
    // open a file called "lenna.png"
    Jimp.read(user.displayAvatarURL, (err, img) => {
      if (err) throw err
      img.quality(5)
      .getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
        if (err) throw err
        const attachment = new Discord.Attachment(buffer, 'jpeg.jpeg')

        msg.channel.send({
          embed: {
            title: `${user.username} needs more JPEG!`,
            color: client.config.color,
            image: {
              url: 'attachment://jpeg.jpeg'
            }
          },
          files: [attachment]
        })
      })
    })
  })
}

exports.help = {
  name: 'needsjpeg',
  description: 'Show someone their avatar with more JPEG.',
  usage: 'needsjpeg <user>',
  fullDesc: 'Show someone their avatar with more JPEG.',
  type: 'fun'
}