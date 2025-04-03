const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');
const cron = require('node-cron');

let channelId = null;
let isNotificationEnabled = true;

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
]});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'setchannel') {
    const newChannelId = interaction.options.getString('channel_id');
    if (!newChannelId) {
      await interaction.reply('채널 ID를 입력하세요!');
      return;
    }
    channelId = newChannelId;
    await interaction.reply(`메시지를 보낼 채널을 <#${channelId}> 으로 설정했습니다.`);
  }

  if (commandName === 'disable') {
    isNotificationEnabled = false;
    await interaction.reply('알림이 비활성화되었습니다. 다음 알림은 월요일 또는 수요일 이후에 활성화됩니다.');
  }

  if (commandName === 'testembed') {
    sendEmbed();
    await interaction.reply('테스트 임베드를 전송했습니다.');
  }
});

function sendEmbed() {
    if (!channelId || !isNotificationEnabled) return;

    const channel = client.channels.cache.get(channelId);
    if (!channel) return;

    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('외출제 알림')
        .setDescription('이번 외출제 때 할 일들을 알려주세요!:\n- 경주와 불닭볶음면 조지기\n- 홍준이와 짜장면 데이트\n- 상혁이와 컴포즈커피 마시기')
        .setFooter({ text: '매주 월요일과 수요일 점심 알림입니다.' })
        .setTimestamp();

    channel.send({ embeds: [embed] });
}

cron.schedule('0 12 * * 1,3', () => {
    sendEmbed();
}, {
    scheduled: true,
    timezone: "Asia/Seoul"
});

// 로그인
client.login(token);