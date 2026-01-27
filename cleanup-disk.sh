#!/bin/bash

echo "=========================================="
echo "디스크 공간 정리 시작..."
echo "=========================================="

# 현재 디스크 사용량 확인
echo "현재 디스크 사용량:"
df -h

# CodeDeploy 로그 파일 정리 (1일 이상 된 것만)
echo "CodeDeploy 로그 파일 정리 중..."
if [ -d "/opt/codedeploy-agent/deployment-root" ]; then
    find /opt/codedeploy-agent/deployment-root -name "*.log" -mtime +1 -delete 2>/dev/null
    find /var/log/aws/codedeploy-agent -name "*.log.*" -mtime +1 -delete 2>/dev/null
    echo "로그 파일 정리 완료"
fi

# APT 캐시 정리 (Ubuntu)
echo "APT 캐시 정리 중..."
apt-get clean -y 2>/dev/null || true
apt-get autoclean -y 2>/dev/null || true

# 불필요한 패키지 제거
echo "불필요한 패키지 제거 중..."
apt-get autoremove -y 2>/dev/null || true

# 임시 파일 정리
echo "임시 파일 정리 중..."
rm -rf /tmp/* 2>/dev/null || true
rm -rf /var/tmp/* 2>/dev/null || true

# 배포 디렉토리에서 불필요한 파일 정리
# BeforeInstall 단계에서는 배포 디렉토리를 건드리지 않음
# (Install 단계에서 파일이 배포되기 전이므로)
# AfterInstall 이후에 정리하는 것이 안전함
echo "배포 디렉토리 정리는 AfterInstall 이후에 수행됩니다"

# Docker 정리 (사용 중인 경우)
if command -v docker &> /dev/null; then
    echo "Docker 정리 중..."
    docker system prune -af --volumes 2>/dev/null || true
fi

# 정리 후 디스크 사용량 확인
echo "=========================================="
echo "정리 후 디스크 사용량:"
df -h
echo "=========================================="
