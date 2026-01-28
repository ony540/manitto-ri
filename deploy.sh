#!/bin/bash
set -e

echo "=== 배포 시작 ==="

cd /home/ubuntu/manitto-ri

# pnpm 설치 확인
if ! command -v pnpm &> /dev/null; then
    echo "pnpm 설치 중..."
    npm install -g pnpm
fi

# 🔥 pm2 완전 정리 (제일 중요)
if command -v pm2 &> /dev/null; then
    echo "기존 PM2 전체 종료..."
    pm2 kill || true
    sleep 2
fi

# 혹시 남아있는 프로세스 강제 종료
pkill -f "next" || true
pkill -f "pnpm" || true
sleep 1

# 의존성 설치 (프로덕션만)
echo "의존성 설치 중..."
pnpm install --frozen-lockfile --prod

# .next 폴더가 없을 때만 빌드 (GitHub Actions에서 빌드한 것이 있으면 사용)
if [ ! -d ".next" ]; then
    echo "경고: .next 폴더가 없습니다. 빌드 시작..."
    pnpm install --frozen-lockfile
    pnpm run build
else
    echo ".next 폴더가 존재합니다. GitHub Actions에서 빌드한 것을 사용합니다."
fi

# 🔥 반드시 cwd 지정해서 pm2 실행
echo "Next.js 앱 시작 중..."
pm2 start pnpm \
  --name "manitto-ri" \
  --cwd /home/ubuntu/manitto-ri \
  -- start

pm2 save
pm2 list

echo "=== 배포 완료 ==="
