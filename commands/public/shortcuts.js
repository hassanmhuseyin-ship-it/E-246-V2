const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const db = require('../../database/db');
const logger = require('../../utils/logger');

function getEmojisJson() {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../../utils/emojis.json'), 'utf8'));
  } catch (e) {
    logger.error('[shortcuts] Failed to parse emojis.json, falling back to empty:', e);
    return {};
  }
}

function resolveEmoji(emojisJson, key, fallback) {
  const val = emojisJson[key];
  if (!val) return fallback;
  const m = val.match(/<a?:(\w+):(\d+)>/);
  if (m) return `<${m[0].startsWith('<a:') ? 'a:' : ':'}${m[1]}:${m[2]}>`;
  return val;
}

module.exports = {
  data: new SlashCommandBuilder().setName('shortcuts').setDescription('عرض قائمة بجميع اختصارات الأوامر المتوفرة في البوت'),

  async execute(interaction) {
    try {
      const guildId = interaction.guild.id;
      const emojisJson = getEmojisJson();
      const bolt = resolveEmoji(emojisJson, 'bolt', '⚡');
      const gift = resolveEmoji(emojisJson, 'gift', '💰');
      const settings = resolveEmoji(emojisJson, 'settings', '⚙️');

      const prefix = db.getGuildSettings(guildId).prefix || '#';

      // 1) الاختصارات المدمجة في البوت (تعمل مع البادئة، مثل #راتب أو #salary)
      const builtInCmds = [...interaction.client.prefixCommands.values()].sort((a, b) =>
        a.name.localeCompare(b.name, 'ar')
      );

      const builtInLines = builtInCmds.map((cmd) => {
        const aliasesText = (cmd.aliases || []).map((a) => `\`${prefix}${a}\``).join(', ');
        return `\`${prefix}${cmd.name}\`${aliasesText ? ` — ${aliasesText}` : ''}`;
      });

      // Discord field values are capped at 1024 chars — split into chunks if needed
      const builtInChunks = [];
      let current = '';
      for (const line of builtInLines) {
        if ((current + '\n' + line).length > 1000) {
          builtInChunks.push(current);
          current = line;
        } else {
          current = current ? `${current}\n${line}` : line;
        }
      }
      if (current) builtInChunks.push(current);

      // 2) الاختصارات المخصصة التي أضافها إداريو هذا السيرفر عبر /alias add
      const customAliases = db.getAliases(guildId) || [];
      const customText = customAliases.length
        ? customAliases.map((a) => `**${a.shortcut}** ➔ \`${a.command}\``).join('\n')
        : 'لا توجد اختصارات مخصصة بعد. أضف واحداً عبر `/alias add`.';

      const embed = new EmbedBuilder()
        .setColor(0x5865f2)
        .setTitle(`${bolt} قائمة اختصارات الأوامر`)
        .setDescription(
          `${gift} **الاختصارات الاقتصادية المدمجة** تُستخدم مع بادئة السيرفر \`${prefix}\`\n` +
            `${settings} **الاختصارات المخصصة** تُكتب مباشرة بدون بادئة، وتُدار عبر أمر \`/alias\``
        )
        .setTimestamp()
        .setFooter({ text: `طلب بواسطة ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

      builtInChunks.forEach((chunk, i) => {
        embed.addFields({
          name: i === 0 ? `${gift} اختصارات البنك والاقتصاد` : '\u200b',
          value: chunk,
          inline: false
        });
      });

      embed.addFields({
        name: `${settings} اختصارات مخصصة لهذا السيرفر`,
        value: customText.slice(0, 1024),
        inline: false
      });

      await interaction.reply({ embeds: [embed] }).catch(() => null);
    } catch (err) {
      logger.error('[Command Error - shortcuts.js]:', err);
      if (interaction && typeof interaction.reply === 'function') {
        await interaction
          .reply({ content: '❌ حدث خطأ أثناء تنفيذ هذا الأمر.', flags: ['Ephemeral'] })
          .catch(() => null);
      }
    }
  }
};
