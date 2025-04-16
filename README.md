# 외출제 노예

## 개요

**외출제 노예**는 외출 시 해야 할 일을 기록하고 알림을 제공하는 Discord 봇입니다. 매주 월요일과 수요일 12시에 외출 계획을 알림으로 보내며, 사용자가 원하는 채널을 설정하고 알림을 비활성화할 수 있습니다.

## 기능

1. **채널 설정**: `/setchannel <channel_id>` 명령어를 통해 메시지를 보낼 채널을 설정합니다.
2. **임베드 메시지 전송**: 매주 월요일과 수요일 12시에 외출 알림을 임베드 형태로 전송합니다.
3. **알림 비활성화**: `/disable` 명령어로 알림을 비활성화 할 수 있습니다.
4. **임베드 전송 테스트**: `/testembed` 명령어를 통해 임베드 메시지를 테스트 할 수 있습니다.

## 명령어 목록

### 1. `/setchannel <channel_id>`

- **설명**: 봇이 메시지를 보낼 채널을 설정합니다.
- **사용 예**: `/setchannel 123456789012345678`

### 2. `/disable`

- **설명**: 알림을 비활성화합니다. 다음 주 월요일 또는 수요일까지 알림이 오지 않습니다<br>
  .ex) 목요일에 비활성화 되었다면 월요일은 알람 X, 수요일은 정상작동
- **사용 예**: `/disable`

### 3. `/testembed`

- **설명**: 설정된 채널로 임베드 전송을 테스트합니다.
- **사용 예**: `/testembed`

## 라이선스

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 설치 방법

1. **필수 패키지 설치**

   ```bash
   npm i
   ```

2. **슬래시 명령어 등록**

   ```bash
   node deploy-commands.js
   ```

3. **봇 실행**
   ```bash
   node index.js
   ```

## 기술 스택

- **discord.js**: Discord API와 상호작용하는 라이브러리
- **node-cron**: 주기적인 작업 스케쥴링을 위한 라이브러리

## 기여

기여를 원하시면 이 프로젝트를 포크하고 풀 리퀘스트를 제출해주세요.

---

**Author**: [KIM TAEEUN](https://github.com/snowykte0426)
**License**: ISC License
