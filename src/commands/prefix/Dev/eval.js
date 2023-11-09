const {
	EmbedBuilder,
	AttachmentBuilder,
} = require("discord.js")

module.exports = {
	structure: {
		name: 'eval',
		description: '',
		aliases: [],
		permissions: null,
		developers: true
	},
	/**
     * @param {ExtendedClient} client
     * @param {ChatInputCommandInteraction<true>} interaction
     */
	run: async (client, interaction, args) => {
		const code = args[0]

		try {
			let executedEvalValue = eval(code)

			if (typeof executedEvalValue !== 'string') executedEvalValue = require('util').inspect(executedEvalValue)

			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle("Code executed")
						.setDescription(`Successfully executed the code, no errors were found.`)
						.setColor('Green')
				],
				files: [
					new AttachmentBuilder(Buffer.from(`${executedEvalValue}`.replace(new RegExp(`${client.token}`, 'g'), '"[CLIENT TOKEN HIDDEN]"'), 'utf-8'), { name: 'output.javascript' })
				]
			})
		} catch (err) {
			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle("Error")
						.setDescription(`Something went wrong while executing your code.`)
						.setColor('Red')
				],
				files: [
					new AttachmentBuilder(Buffer.from(`${err}`, 'utf-8'), { name: 'output.txt' })
				]
			})
		}

	},
}
