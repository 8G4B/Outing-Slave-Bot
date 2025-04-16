const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const { token } = require("./config.json");
const cron = require("node-cron");
const winston = require("winston");

let channelId = null;
let isNotificationEnabled = true;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "채널설정") {
    const newChannelId = interaction.options.getString("채널_id");
    if (!newChannelId) {
      await interaction.reply("채널 ID를 입력하세요!");
      log.error("채널 ID가 제공되지 않았습니다.");
      return;
    }
    channelId = newChannelId;
    await interaction.reply(
      `메시지를 보낼 채널을 <#${channelId}> 으로 설정했습니다.`
    );
    log.info(`채널 ID가 ${channelId}으로 설정되었습니다.`);
  }

  if (commandName === "알림비활성화") {
    isNotificationEnabled = false;
    await interaction.reply(
      "알림이 비활성화되었습니다. 다음 알림은 월요일 또는 수요일 이후에 활성화됩니다."
    );
    log.info("알림 비활성화됨");
  }

  if (commandName === "임베드테스트") {
    sendEmbed();
    await interaction.reply("테스트 임베드를 전송했습니다.");
    log.info(
      `${interaction.user.tag}이(가) ${channelId}에 임베드 테스트를 요청했습니다.`
    );
  }
});

function sendEmbed() {
  if (!channelId || !isNotificationEnabled) {
    isNotificationEnabled = true;
    return;
  }
  const channel = client.channels.cache.get(channelId);
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor("#0099ff")
    .setTitle("외출제 알림")
    .setDescription(
      "이번 외출제 때 할 일들을 알려주세요!:\n- 경주와 불닭볶음면 조지기\n- 홍준이와 짜장면 데이트\n- 상혁이와 컴포즈커피 마시기"
    )
    .setFooter({ text: "매주 월요일과 수요일 점심 알림입니다." })
    .setTimestamp();

  channel.send({ embeds: [embed] });
}

cron.schedule(
  "0 12 * * 1,3",
  () => {
    sendEmbed();
  },
  {
    scheduled: true,
    timezone: "Asia/Seoul",
  }
);

const log = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

client.login(token);

log.info("봇이 로그인했습니다.");
client.once("ready", () => {
  log.info(`Logged in as ${client.user.tag}!`);
});
