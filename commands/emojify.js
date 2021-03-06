/* Eris Fixed */

const mapping = {
  ' ': '   ',
  '0': ':zero:',
  '1': ':one:',
  '2': ':two:',
  '3': ':three:',
  '4': ':four:',
  '5': ':five:',
  '6': ':six:',
  '7': ':seven:',
  '8': ':eight:',
  '9': ':nine:',
  '!': ':grey_exclamation:',
  '?': ':grey_question:',
  '#': ':hash:',
  '*': ':asterisk:'
}

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`
})

exports.run = (client, message, args) => {
  try {
    if (args.length < 1) {
      message.channel.createMessage('You must provide some text to emojify!')
    }

    message.channel.createMessage(args.join(' ').split('').map(c => mapping[c] || c).join('')).catch(console.log)
  } catch (err) {
    message.channel.createMessage(`:exclamation: │ There was an error running the command. This incident has been reported.`)
    client.rollbar.error(`Error on emojify commands\n\nError:\n\n ${err}`)
  }
}

exports.help = {
  name: 'emojify',
  description: 'Says your text in big LETTERS.',
  usage: 'emojify <text>',
  fullDesc: 'Says your text in big LETTERS.',
  type: 'fun',
  status: 2,
  aliases: []
}
