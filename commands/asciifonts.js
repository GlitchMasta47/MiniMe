exports.run = (client, msg) => {
  msg.channel.createMessage('Here is a list of fonts to be used with `' + client.config.prefix + 'ascii`: http://www.figlet.org/examples.html')
}

exports.help = {
  name: 'asciifonts',
  description: 'Get a list of ASCII fonts.',
  usage: 'asciifonts',
  fullDesc: 'Get a list of ASCII fonts.',
  type: 'util',
  status: 2,
  aliases: []
}
