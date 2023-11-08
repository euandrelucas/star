const { Message, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const GuildSchema = require('../../../schemas/GuildSchema');

module.exports = {
    structure: {
        name: 'code',
        description: 'Get/Set/Default prefix',
        aliases: ['qrcode', 'barcode', 'gencode']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        const type = args[0];
 
        switch (type) {
            case 'qrcode': {
                if (!args[1]) return message.reply({
                    content: `${client.emoji.error} **|** Você precisa inserir o \`URL\` ou \`TEXTO\` para gerar o QR code.`
                })

                const QRCode = require('qrcode')
                const qr = await QRCode.toBuffer(args.join(' '), {
                    scale: 10
                })
                const attachment = new AttachmentBuilder(Buffer.from(qr, 'base64'), {
                    name: 'qrcode.png'
                })
                const embed = new EmbedBuilder()
                .setTitle(`${client.emoji.qrcode} Código QR`)
                .setColor('#8e00ff')
                .setImage('attachment://qrcode.png')
                message.reply({
                    embeds: [embed],
                    files: [attachment]
                })

                break;
            }

            case 'reset': {
                let data = await GuildSchema.findOne({ guild: message.guildId });

                if (data) {
                    await GuildSchema.deleteOne({ guild: message.guildId });
                }

                await message.reply({
                    content: `The new prefix on this server is: \`${config.handler.prefix}\` (default).`
                });

                break;
            }

            default: {
                await message.reply({
                    content: 'Allowed methods: `set`, `reset`'
                });

                break;
            }
        }
    }
};
