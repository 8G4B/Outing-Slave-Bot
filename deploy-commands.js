const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const { token, clientId } = require('./config.json');

const commands = [
  new SlashCommandBuilder().setName('채널설정').setDescription('알림을 보낼 채널 ID를 설정합니다.').addStringOption(option =>
    option.setName('채널_id').setDescription('채널 ID').setRequired(true)),
  new SlashCommandBuilder().setName('알림비활성화').setDescription('알림을 비활성화합니다.'),
  new SlashCommandBuilder().setName('임베드테스트').setDescription('임베드 메시지를 테스트로 전송합니다.')
]
  .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('슬래시 명령어 등록 중...');

    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );

    console.log('슬래시 명령어 등록 완료!');
  } catch (error) {
    console.error(error);
  }
})();