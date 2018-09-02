/* eslint no-eval: 0 */
const formatArbitrary = require('../util/formatArbitrary.js')
const uploadToHastebin = require('../util/uploadToHastebin.js')

const clean = text => {
  if (typeof text === 'string') {
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
  } else {
    return text
  }
}

exports.run = async (client, message, args) => {
  if (message.author.id !== client.config.ownerID) { return message.channel.send(':no_entry_sign: │ Only my developer can use this!') }
  try {
    const code = args.join(' ')
    let evaled = await eval(code)

    if (typeof evaled !== 'string') { evaled = require('util').inspect(evaled) }

    if (formatArbitrary(client, clean(evaled)).length > 1992) {
      uploadToHastebin(formatArbitrary(client, clean(evaled))).then((url) => {
        message.channel.send(':outbox_tray: │ ' + url)
      }).catch((error) => {
        message.channel.send(':exclamation: │ Failed to upload result to hastebin. `' + error.message + '`')
      })
    } else {
      message.channel.send('```js\n' + formatArbitrary(client, clean(evaled)) + '```')
    }
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
  }
}

exports.help = {
  name: 'eval',
  description: 'Evaluates JavaScript.',
  usage: 'eval <code>',
  fullDesc: `Evaluates Javascript. Can only be used by my developer. :P`,
  type: 'dev',
  status: 2
}
