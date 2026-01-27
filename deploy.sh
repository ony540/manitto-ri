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
    # PM2 프로세스 완전히 종료 대기
    sleep 2
fi

# 기존 Next.js 프로세스 종료 (PM2 없을 때)
pkill -f "next start" || true
pkill -f "pnpm start" || true
sleep 1

# Next.js 빌드 캐시 정리 (새로운 빌드 파일 사용)
echo "Next.js 빌드 캐시 정리 중..."
if [ -d ".next" ]; then
    # .next/cache만 삭제 (빌드 파일은 유지)
    rm -rf .next/cache 2>/dev/null || true
    echo "빌드 캐시 정리 완료"
fi

# Next.js 앱 시작
echo "Next.js 앱 시작 중..."
if command -v pm2 &> /dev/null; then
    pm2 start pnpm --name "manitto-ri" -- start
    pm2 save
    echo "PM2 프로세스 상태:"
    pm2 list
else
    # PM2가 없으면 nohup으로 백그라운드 실행
    nohup pnpm start > /var/log/manitto-ri-app.log 2>&1 &
    echo "프로세스 PID: $!"
fi

echo "배포 완료!"
