const { ChatInputCommandInteraction, SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('bot')
        .setDescription('Comandos relacionados ao bot.')
        .addSubcommand(subcommand => subcommand
            .setName('sugerir')
            .setDescription('Sugira algo para o bot.')),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const subcommand = interaction.options.getSubcommand();
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
            await interaction.showModal(modal);
        }
    }
};