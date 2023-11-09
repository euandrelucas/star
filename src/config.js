const emojis = require('./utils/emojis.json')

module.exports = {
  client: {
    token: process.env.CLIENT_ID,
    id: process.env.CLIENT_ID,
  },
  supportServer: {
    suggestion: {
      channel: '1172121827187900457',
      tagID: '1172122221251137556'
    }
  },
  handler: {
    prefix: "s!",
    deploy: true,
    commands: {
      prefix: true,
      slash: true,
      user: true,
      message: true,
    },
    mongodb: {
      uri: process.env.MONGODB_URI,
      toggle: false,
    },
  },
  users: {
    developers: ["717766639260532826"],
  },
  messageSettings: {
    nsfwMessage: `${emojis.error} **|** Este canal não é um canal NSFW.`,
    developerMessage: `${emojis.error} **|** Você não possui autorização para utilizar este comando.`,
    cooldownMessage: `${emojis.error} **|** Calma ai, amigo! Aguarde para usar este comando.`,
    notHasPermissionMessage:
    `${emojis.error} **|** Você não tem permissão para usar esse comando.`,
    missingDevIDsMessage:
    `${emojis.error} **|** Esse é um comando exclusivo para desenvolvedores..`,
  },
};
