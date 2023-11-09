const config = require('../../config')

module.exports = {
	customId: 'bot;bug',
	/**
     * 
     * @param {ExtendedClient} client 
     * @param {ModalSubmitInteraction} interaction 
     */
	run: async (client, interaction) => {

		const title = interaction.fields.getTextInputValue('sug;title')
		const description = interaction.fields.getTextInputValue('sug;description')

		const channel = await client.channels.cache.get(config.supportServer.bug.channel)

		await channel.threads.create({
			name: title,
			message: {
				content: `# ${title}\n- Bug reportado por: ${interaction.user.tag} (${interaction.user.id})\n## Bug:\n${description}`
			},
			appliedTags: [config.supportServer.bug.tagID],
		}).then(async (ch) => {
			await interaction.reply({
				content: `${client.emoji.check} **|** Seu bug foi enviada para nossa equipe! (<#${ch.id}>)`,
				ephemeral: true
			})
		})
	}
}