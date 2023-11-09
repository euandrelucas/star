const { Message, AttachmentBuilder, EmbedBuilder } = require('discord.js')
const ExtendedClient = require('../../../class/ExtendedClient')
const config = require('../../../config')
const GuildSchema = require('../../../schemas/GuildSchema')

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
		const type = args[0].toLowerCase()
 
		switch (type) {
			case 'qrcode': {
				if (!args[1]) return message.reply({
					content: `${client.emoji.error} **|** Você precisa inserir o \`URL\` ou \`TEXTO\` para gerar o código QR.`
				})

				const QRCode = require('qrcode')
				const qr = await QRCode.toBuffer(args.slice(1).join(' '), {
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

				break
			}

			case 'barcode': {
				if (!args[1]) return message.reply({
					content: `${client.emoji.error} **|** Você precisa inserir o \`TEXTO\` para gerar o código de barras.`
				})

				const Barcode = require('jsbarcode')
				const canvas = require('canvas')
				const Canvas = canvas.createCanvas(400, 200)
				const ctx = Canvas.getContext('2d')
				Barcode(Canvas, args.slice(1).join(' '))
				const attachment = new AttachmentBuilder(Canvas.toBuffer(), {
					name: 'barcode.png'
				})
				const embed = new EmbedBuilder()
					.setTitle(`${client.emoji.barcode} Código de Barras`)
					.setColor('#8e00ff')
					.setImage('attachment://barcode.png')
				message.reply({
					embeds: [embed],
					files: [attachment]
				})

				break
			}

			default: {
				await message.reply({
					content: `${client.emoji.error} **|** Você precisa escolher entre \`QRCODE\` ou \`BARCODE\` para gerar o código.`
				})

				break
			}
		}
	}
}
