const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
	structure: new SlashCommandBuilder()
		.setName('bot')
		.setDescription('Comandos relacionados ao bot.')
		.addSubcommand(subcommand => subcommand
			.setName('sugerir')
			.setDescription('Sugira algo para o bot.'))
		.addSubcommand(subcommand => subcommand
			.setName('bug')
			.setDescription('Reporte algum bug do bot.')),
	/**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
	run: async (client, interaction) => {
		const subcommand = interaction.options.getSubcommand()
		if (subcommand === 'sugerir') {
			const modal = new ModalBuilder()
				.setTitle('Sugestão')
				.setCustomId('bot;sug')
				.addComponents(
					new ActionRowBuilder()
						.addComponents(
							new TextInputBuilder()
								.setLabel('Título')
								.setCustomId('sug;title')
								.setPlaceholder('Qual é o título da sua sugestão?')
								.setStyle(TextInputStyle.Short)
								.setRequired(true),
						)
				)
				.addComponents(
					new ActionRowBuilder()
						.addComponents(
							new TextInputBuilder()
								.setLabel('Sugestão')
								.setCustomId('sug;description')
								.setPlaceholder('Escreva sua sugestão, de forma detalhada!')
								.setStyle(TextInputStyle.Paragraph)
								.setRequired(true)
						)
				)
			await interaction.showModal(modal)
		}
		if (subcommand === 'bug') {
			const modal = new ModalBuilder()
				.setTitle('Reportar Bug')
				.setCustomId('bot;bug')
				.addComponents(
					new ActionRowBuilder()
						.addComponents(
							new TextInputBuilder()
								.setLabel('Título')
								.setCustomId('sug;title')
								.setPlaceholder('Qual é o título do seu bug?')
								.setStyle(TextInputStyle.Short)
								.setRequired(true),
						)
				)
				.addComponents(
					new ActionRowBuilder()
						.addComponents(
							new TextInputBuilder()
								.setLabel('Sugestão')
								.setCustomId('sug;description')
								.setPlaceholder('Escreva como reprodiuzir o bug, de forma detalhada!')
								.setStyle(TextInputStyle.Paragraph)
								.setRequired(true)
						)
				)
			await interaction.showModal(modal)
		}
	}
}