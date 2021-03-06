/* Eris Fixed */

const randomPuppy = require('random-puppy')
const snekfetch = require('snekfetch')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const Logger = require('../util/Logger.js')

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.createMessage(':exclamation: │ You can only run this command in a NSFW channel!')
  snekfetch.get(`https://botlist.space/api/bots/${client.user.id}/upvotes?ids=true`)
  .set('Authorization', client.config.apis.botlists.bls)
  .end((err, res) => {
    if (err) {
      msg.channel.createMessage(':exclamation: │ There was an error running the command. This incident has been reported.')
      Logger.error(client, `[porngif.js] snekfetch error.`, err)
    }
    var check = res.body.includes(msg.author.id.toString())
    if (msg.author.id === client.config.ownerID) check = 1
    if (check === 1) {
      randomPuppy('porn_gifs').then(url => {
        msg.channel.createMessage({
          embed: {
            author: {
              icon_url: msg.author.avatarURL,
              name: `Porn Gif │ Requested by ${msg.author.username}#${msg.author.discriminator}`
            },
            color: getEmbedColor(client, msg),
            image: {
              url: url
            },
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: 'Status: 200'
            }
          }
        })
      })
    } else {
      msg.channel.createMessage({
        embed: {
          title: 'Upvoters-Only Command',
          url: 'https://botlist.space/view/456926578228723724',
          description: 'This command is available only for upvoters',
          fields: [{
              name: 'Go upvote at',
              value: 'https://botlist.space/view/456926578228723724'
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: 'Status: 403'
          }
        }
      })
    }
  })
}

exports.help = {
  name: 'porngif',
  description: 'Provides a gif of porn.',
  usage: 'porngif',
  fullDesc: 'Provides a gif of porn.',
  type: 'nsfw',
  status: 2,
  aliases: ['pgif']
}
