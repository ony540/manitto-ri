#!/bin/bash

echo "=========================================="
echo "디스크 공간 정리 시작..."
echo "=========================================="

# 현재 디스크 사용량 확인
echo "현재 디스크 사용량:"
df -h

# CodeDeploy 오래된 배포 파일 정리 (모두 삭제 - DownloadBundle 전에 공간 확보)
echo "CodeDeploy 배포 파일 정리 중..."
if [ -d "/opt/codedeploy-agent/deployment-root" ]; then
    cd /opt/codedeploy-agent/deployment-root
    # 모든 배포 디렉토리 삭제 (ongoing-deployment 제외)
    if [ -d "ongoing-deployment" ]; then
        # ongoing-deployment만 남기고 나머지 삭제
        ls -1d */ 2>/dev/null | grep -v "ongoing-deployment" | xargs rm -rf 2>/dev/null || true
    else
        # ongoing-deployment가 없으면 모두 삭제
        rm -rf * 2>/dev/null || true
    fi
    echo "CodeDeploy 배포 파일 삭제 완료"
fi

# CodeDeploy 로그 파일 정리 (모든 로그 파일 삭제)
echo "CodeDeploy 로그 파일 정리 중..."
if [ -d "/opt/codedeploy-agent/deployment-root" ]; then
    find /opt/codedeploy-agent/deployment-root -name "*.log" -delete 2>/dev/null
    find /var/log/aws/codedeploy-agent -name "*.log.*" -delete 2>/dev/null
    echo "로그 파일 삭제 완료"
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
echo "배포 디렉토리 정리 중..."
if [ -d "/home/ubuntu/manitto-ri" ]; then
    cd /home/ubuntu/manitto-ri
    # .git 삭제 (배포에 불필요)
    rm -rf .git 2>/dev/null || true
    # node_modules 삭제 (deploy.sh에서 다시 설치됨)
    rm -rf node_modules 2>/dev/null || true
    # .next 빌드 파일 삭제 (새로 배포될 예정)
    rm -rf .next 2>/dev/null || true
    echo "배포 디렉토리 정리 완료"
fi

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
