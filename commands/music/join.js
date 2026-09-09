const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const logger = require('../../utils/logger');

module.exports = {
  data: new SlashCommandBuilder().setName('join').setDescription('استدعاء البوت للانضمام إلى غرفتك الصوتية'),

  async execute(interaction) {
    try {
      const client = interaction.client;

      const channel = interaction.member.voice.channel;
      if (!channel) {
        return interaction.reply({ content: '{emoji:circlex} يجب أن تكون في غرفة صوتية', flags: ['Ephemeral'] });
      }

      const hasNode = [...client.manager.nodeManager.nodes.values()].some((node) => node.connected);
      if (!hasNode) {
        return interaction.reply({
          content: '{emoji:circlex} لا يوجد اتصال بخادم الموسيقى حالياً',
          flags: ['Ephemeral']
        });
      }

      const existingPlayer = client.manager.getPlayer(interaction.guild.id);

      if (existingPlayer && existingPlayer.voiceChannelId === channel.id) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder().setColor(0x5865f2).setDescription(`{emoji:circlex} أنا بالفعل معك في <#${channel.id}>`)
          ],
          flags: ['Ephemeral']
        });
      }

      if (existingPlayer && existingPlayer.voiceChannelId !== channel.id) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(0xed4245)
              .setDescription(
                `{emoji:circlex} أنا متصل حالياً في <#${existingPlayer.voiceChannelId}>، استخدم \`/stop\` أولاً إذا تريد نقلي.`
              )
          ],
          flags: ['Ephemeral']
        });
      }

      const player = client.manager.createPlayer({
        guildId: interaction.guild.id,
        voiceChannelId: channel.id,
        textChannelId: interaction.channel.id,
        selfDeaf: true
      });
      await player.connect();

      return interaction.reply({
        embeds: [new EmbedBuilder().setColor(0x5865f2).setDescription(`:wave: | **انضممت إلى <#${channel.id}>**`)]
      });
    } catch (err) {
      logger.error('[Command Error - join.js]:', err);
      if (interaction && typeof interaction.reply === 'function') {
        await interaction
          .reply({ content: '❌ حدث خطأ أثناء تنفيذ هذا الأمر.', flags: ['Ephemeral'] })
          .catch(() => null);
      }
    }
  }
};
