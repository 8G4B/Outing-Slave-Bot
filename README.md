# 외출제 노예

## 개요

**외출제 노예**는 외출 시 해야 할 일을 기록하고 알림을 제공하는 Discord 봇입니다. 매주 월요일과 수요일 12시에 외출 계획을 알림으로 보내며, 사용자가 원하는 채널을 설정하고 알림을 비활성화할 수 있습니다. 알림 메시지는 미리 준비된 다양한 활동 중에서 랜덤으로 3개를 선택하여 표시되며, 개별 할일 추천 기능도 제공합니다.

## 기능

1. **채널 설정**: `/채널설정 <채널_id>` 명령어를 통해 메시지를 보낼 채널을 설정합니다.
2. **자동 임베드 메시지 전송**: 매주 월요일과 수요일 12시에 외출 알림을 임베드 형태로 자동 전송합니다. 메시지는 다양한 활동 중 랜덤으로 3개를 선택합니다.
3. **할일 추천**: `/할일추천` 명령어로 외출제 할일을 하나 추천받을 수 있습니다.
4. **알림 비활성화**: `/알림비활성화` 명령어로 자동 알림을 비활성화할 수 있습니다.
5. **알림 활성화**: `/알림활성화` 명령어로 자동 알림을 다시 활성화할 수 있습니다.
6. **임베드 전송 테스트**: `/임베드테스트` 명령어를 통해 임베드 메시지를 수동으로 테스트할 수 있습니다.

## 명령어 목록

### 1. `/채널설정 <채널_id>`

- **설명**: 봇이 자동 알림 메시지를 보낼 채널을 설정합니다.
- **사용 예**: `/채널설정 123456789012345678`

### 2. `/할일추천`

- **설명**: messages.json에서 외출제 할일을 하나 랜덤하게 추천해드립니다.
- **사용 예**: `/할일추천`
- **응답 예시**: 
  ```
  🎯 할일 추천
  오늘의 추천 할일: **경주와 불닭볶음면 조지기**
  즐거운 외출제 되세요!
  ```

### 3. `/알림비활성화`

- **설명**: 자동 알림을 비활성화합니다. 다음 주 월요일 또는 수요일까지 알림이 오지 않습니다.
- **예시**: 목요일에 비활성화되었다면 월요일은 알림 X, 수요일은 정상작동
- **사용 예**: `/알림비활성화`

### 4. `/알림활성화`

- **설명**: 자동 알림을 다시 활성화합니다. 다음 예정된 알림부터 정상적으로 전송됩니다.
- **사용 예**: `/알림활성화`

### 5. `/임베드테스트`

- **설명**: 설정된 채널로 임베드 메시지 전송을 테스트합니다.
- **사용 예**: `/임베드테스트`

## 설치 및 실행 방법

### 1. 필수 패키지 설치

```bash
npm install
```

### 2. 설정 파일 준비

```bash
# config.json.example을 참고하여 config.json 파일 생성
cp config.json.example config.json
```

config.json 파일에 다음 정보를 입력하세요:
```json
{
  "token": "YOUR_BOT_TOKEN",
  "clientId": "YOUR_CLIENT_ID"
}
```

### 3. 슬래시 명령어 등록

```bash
node deploy-commands.js
```

### 4. 봇 실행

```bash
node index.js
```

## 스케줄링

- **자동 알림 시간**: 매주 월요일과 수요일 12:00 (한국 시간 기준)
- **타임존**: Asia/Seoul

## 파일 구조

```
Outing-Slave-Bot/
├── index.js              # 메인 봇 로직과 이벤트 처리
├── deploy-commands.js     # 슬래시 명령어 Discord 서버 등록
├── messages.json          # 외출 알림에 사용될 다양한 활동 메시지 목록
├── config.json           # 봇 토큰 및 클라이언트 ID (git 추적 안됨)
├── config.json.example   # 설정 파일 예시
├── package.json          # 의존성 및 프로젝트 메타데이터
├── Dockerfile            # 컨테이너 배포 설정
├── .gitignore           # Git 무시 설정
└── README.md            # 프로젝트 문서
```

## 기술 스택

- **Node.js**: JavaScript 런타임 환경
- **discord.js**: Discord API와 상호작용하는 라이브러리
- **node-cron**: 주기적인 작업 스케줄링을 위한 라이브러리
- **winston**: 로깅 라이브러리

## 메시지 커스터마이징

`messages.json` 파일을 수정하여 외출 활동 목록을 커스터마이징할 수 있습니다:

```json
{
  "outingMessages": [
    "경주와 불닭볶음면 조지기",
    "홍준이와 짜장면 데이트",
    "상혁이와 컴포즈커피 마시기",
    // ... 더 많은 활동들
  ]
}
```

## Docker로 실행하기

```bash
# Docker 이미지 빌드
docker build -t outing-slave-bot .

# Docker 컨테이너 실행
docker run -d --name outing-bot outing-slave-bot
```

## 라이선스

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 기여

기여를 원하시면 이 프로젝트를 포크하고 풀 리퀘스트를 제출해주세요.

1. 프로젝트 포크
2. 새로운 기능 브랜치 생성 (`git checkout -b feature/new-feature`)
3. 변경사항 커밋 (`git commit -am 'Add new feature'`)
4. 브랜치에 푸시 (`git push origin feature/new-feature`)
5. 풀 리퀘스트 생성

---

**Author**: [KIM TAEEUN](https://github.com/snowykte0426)  
**License**: ISC License  
**Version**: 1.0.0
