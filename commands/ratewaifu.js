/* Eris Fixed */

exports.run = (client, message, args) => {
  let waifu = args[0]
  if (!waifu) waifu = message.author.username
  let rating = Math.floor(Math.random() * 10) + 1
  if (waifu.toLowerCase() === 'railrunner16') rating = 10
  if (waifu.toLowerCase() === 'sytun' || waifu.toLowerCase() === 'jay t') rating = 0
  message.channel.createMessage(":thinking: │ I'd give " + waifu + ' a rating of **' + rating.toString() + '/10**.')
}

exports.help = {
  name: 'ratewaifu',
  description: 'Rates a waifu.',
  usage: 'ratewaifu <name>',
  fullDesc: 'Rates a waifu. Must have a name as the first and only parameter.',
  type: 'fun',
  status: 2,
  aliases: []
}
