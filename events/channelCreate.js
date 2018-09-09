const util = require('../util.js')
const dateformat = require('dateformat')

module.exports = async (client, channel) => {
  client.r.table('serverSettings').get(channel.guild.id).run(async(error, settings) => {
    if (!settings) return
    if (!settings.doLogs) return
    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first())
    
    const logChannel = channel.guild.channels.get(settings.logChannel)
    logChannel.send({
      embed: {
        title: 'Channel Create',
        color: client.config.color,
        thumbnail: {
          url: entry.executor.avatarURL
        },
        fields: [
          {
            name: 'Executor:',
            value: entry.executor.username + '#' + entry.executor.discriminator,
            inline: true
          },
          {
            name: 'Channel:',
            value: `${channel}`,
            inline: true
          },
          {
            name: 'Time:',
            value: dateformat(entry.createdTimestamp, 'mm/dd/yy hh:MM:ss TT'),
            inline: true
          }
        ]
      }
    })
  })
}
