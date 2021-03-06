/* Eris Fixed */

const resolveUser = require('../util/resolveUser.js')
const Logger = require('../util/Logger.js')

exports.run = (client, msg, args) => {
  if (args[0]) {
    resolveUser(client, args.join(' ')).then(user => {
      client.r.table('balance').get(user.id).run((error, balance) => {
        if (error) {
          return Logger.error('Error with event.', error)
        }
        const bal = balance ? balance.amount.toString() : 0
        msg.channel.createMessage(`${user.username}#${user.discriminator} has **<:coins:482589075459801098> ${bal} Minicoins** in their bank account.`)
			})
    })
  } else {
    client.r.table('balance').get(msg.author.id).run((error, balance) => {
      if (error) {
        return Logger.error('Error with event.', error)
      }
      const bal = balance ? balance.amount.toString() : 0
      msg.channel.createMessage(`You have **<:coins:482589075459801098> ${bal} Minicoins** in your bank account.`)
		})
  }
}

exports.help = {
  name: 'balance',
  description: 'Check the amount of money in your bank account.',
  usage: 'balance [user]',
  fullDesc: 'Check the amount of money in you (or someone else\'s) bank account.',
  type: 'eco',
  status: 2,
  aliases: ['bal', 'bank']
}
