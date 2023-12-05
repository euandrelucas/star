const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, SlashCommandBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js")
const ExtendedClient = require("../../../class/ExtendedClient")
const fetch = require('node-fetch')
const path = require('path')
const config = require('../../../config')

module.exports = {
	structure: new SlashCommandBuilder()
		.setName("boobs")
		.setDescription("Nsfw command."),
	options: {
		nsfw: true,
	},
	run: async (client, interaction) => {
		await interaction.deferReply()
		const response = await fetch('https://nekobot.xyz/api/image?type=boobs')
		const data = await response.json()
		let image = data.message

		while (image.endsWith('.gif')) {
			const newResponse = await fetch('https://nekobot.xyz/api/image?type=boobs')
			const newData = await newResponse.json()
			image = newData.message
		}

		async function getImageAsBase64(url) {
			const response = await fetch(url)
			const buffer = await response.buffer()
			const base64 = buffer.toString('base64')
			return base64
		}

		function getFileExtension(url) {
			return path.extname(new URL(url).pathname)
		}

		function getFileName(url) {
			return path.basename(new URL(url).pathname)
		}

		const name = getFileName(image)
		const type = getFileExtension(image)
		const base64 = await getImageAsBase64(image)

		const attachment = new AttachmentBuilder(Buffer.from(base64, 'base64'), {
			name: 'boobs' + type
		})

		const embed = new EmbedBuilder()
			.setTitle(`${client.emoji.nsfw} Imagem +18 (Peitos)`)
			.setColor('Blurple')
			.setImage('attachment://boobs' + type)

		const button = new ButtonBuilder()
			.setEmoji(client.emoji.favorite.replace(/</g, '').replace(/>/g, ''))
			.setStyle(ButtonStyle.Secondary)
			.setCustomId(`fav;${name}`)

		const row = new ActionRowBuilder()
			.addComponents(button)

		await interaction.editReply({ embeds: [embed], components: [row], files: [attachment] })

		const cdn = await client.channels.cache.get(config.supportServer.cdn.nsfw)
		cdn.send({ files: [attachment] }).then(async (msg) => {
			const attachment = msg.attachments.first()
			await client.db.set(`nsfw-${name}`, attachment.attachment)
		})
	}
}
