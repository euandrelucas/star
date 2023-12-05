const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const { PaginationWrapper } = require("djs-button-pages")
const ExtendedClient = require("../../../class/ExtendedClient")
const config = require('../../../config')
const { NextPageButton, PreviousPageButton } = require('@djs-button-pages/presets')

module.exports = {
	structure: new SlashCommandBuilder()
		.setName("favorites")
		.setDescription("Nsfw command."),
	options: {
		nsfw: true,
	},
	run: async (client, interaction) => {
		await interaction.deferReply()
		const images = await client.db.get(`favNsfw-${interaction.user.id}`)
		if (!images) return interaction.editReply({ content: `${client.emoji.error} **|** Você não possui imagens favoritadas.` })
		
		let embeds = []
		await images.map(image => {
			const splitURL = image.split('?')[0]
			console.log(splitURL)
			const embed = new EmbedBuilder()
				.setTitle(`${client.emoji.nsfw} Imagem +18`)
				.setColor('Blurple')
				.setImage(splitURL)
			embeds.push(embed)
		})
		
		const buttons = [
			new PreviousPageButton({ custom_id: "prev_page", emoji: "◀", style: ButtonStyle.Secondary }),
			new NextPageButton({ custom_id: "next_page", emoji: "▶", style: ButtonStyle.Secondary }),
		]
		
		const pagination = new PaginationWrapper()
			.setButtons(buttons)
			.setEmbeds(embeds)
			.setTime(60000)

		await pagination.interactionReply(interaction)
	}
}
