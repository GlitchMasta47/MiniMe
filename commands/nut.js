const jimp = require('jimp')

exports.run = (message, bot) => {
  if (!message.args[0]) message.suffix = "When the user who ran this command is currently participating in a gay orgy, because he didn't put any text after the command."
  jimp.read('../assets/nut.jpg', (err, image) => {
    if (err) return console.log(err)
    var text = new jimp(630, 150, function (err, text) {
      if (err) return console.log(err)
      jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(function (font) {
         text.print(font, 0, 0, message.suffix, 650)
         image.composite(text, 15, 5)
         image.getBuffer(jimp.AUTO, (err, buffer) => {
           if (err) return console.log(err)
           message.channel.sendFile(buffer)
         })
      })
    })
  })
}

exports.help = {
  name: 'nut',
  description: 'Put text in the Nut meme.',
  usage: 'nut <text>',
  fullDesc: 'Put text in the Nut meme.',
  type: 'fun'
}
