const { UserContextMenuCommandInteraction, ContextMenuCommandBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new ContextMenuCommandBuilder()
        .setName('User Info')
        .setType(2),
    /**
     * @param {ExtendedClient} client 
     * @param {UserContextMenuCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        console.log(interaction.user)
        
        await interaction.reply({
            content: 'Hello user context command!'
        });

    }
};