const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST, Routes } = require("discord.js");
const { token, clientId } = require("./config.json");

const commands = [
  new SlashCommandBuilder()
    .setName("setchannel")
    .setDescription("설정할 채널 ID를 입력합니다.")
    .addStringOption((option) =>
      option.setName("channel_id").setDescription("채널 ID").setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("disable")
    .setDescription("알림을 비활성화합니다."),
  new SlashCommandBuilder()
    .setName("testembed")
    .setDescription("임베드 메시지를 테스트로 전송합니다."),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("슬래시 명령어 등록 중...");

    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log("슬래시 명령어 등록 완료!");
  } catch (error) {
    console.error(error);
  }
})();
