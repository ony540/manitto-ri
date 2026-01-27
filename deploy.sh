#!/bin/bash

# 배포 디렉토리로 이동
cd /home/ubuntu/manitto-ri

# pnpm이 설치되어 있지 않으면 설치
if ! command -v pnpm &> /dev/null; then
    echo "pnpm이 설치되어 있지 않습니다. 설치 중..."
    npm install -g pnpm
fi

# 의존성 설치
echo "의존성 설치 중..."
pnpm install --frozen-lockfile --prod

# 기존 프로세스 종료 (PM2 사용 시)
if command -v pm2 &> /dev/null; then
    echo "기존 PM2 프로세스 종료 중..."
    pm2 stop manitto-ri || true
    pm2 delete manitto-ri || true
fi

# Next.js 앱 시작
echo "Next.js 앱 시작 중..."
if command -v pm2 &> /dev/null; then
    pm2 start pnpm --name "manitto-ri" -- start
    pm2 save
else
    # PM2가 없으면 nohup으로 백그라운드 실행
    nohup pnpm start > /dev/null 2>&1 &
fi

echo "배포 완료!"
