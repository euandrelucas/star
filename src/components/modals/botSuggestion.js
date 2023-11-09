const { ModalSubmitInteraction } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const config = require('../../config');

module.exports = {
    customId: 'bot;sug',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {

        const title = interaction.fields.getTextInputValue('sug;title');
        const description = interaction.fields.getTextInputValue('sug;description');

        const channel = await client.channels.cache.get(config.supportServer.suggestion.channel);

        await channel.threads.create({
            name: title,
            message: {
                content: `# ${title}\n- Sugestão de: ${interaction.user.tag} (${interaction.user.id})\n## Sugestão:\n${description}`
            },
            appliedTags: [config.supportServer.suggestion.tagID],
        }).then(async (ch) => {
            await interaction.reply({
                content: `${client.emoji.check} **|** Sua sugestão foi enviada para nossa equipe! (<#${ch.id}>)`,
                ephemeral: true
            })
        })
    }
};