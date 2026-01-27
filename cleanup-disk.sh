#!/bin/bash

echo "=========================================="
echo "디스크 공간 정리 시작..."
echo "=========================================="

# 현재 디스크 사용량 확인
echo "현재 디스크 사용량:"
df -h

# CodeDeploy 오래된 배포 파일 정리 (최근 1개만 유지)
echo "CodeDeploy 오래된 배포 파일 정리 중..."
if [ -d "/opt/codedeploy-agent/deployment-root" ]; then
    cd /opt/codedeploy-agent/deployment-root
    # 배포 디렉토리 개수 확인
    DEPLOY_COUNT=$(ls -1d */ 2>/dev/null | wc -l)
    echo "현재 배포 디렉토리 개수: $DEPLOY_COUNT"
    
    if [ "$DEPLOY_COUNT" -gt 1 ]; then
        # 오래된 배포 디렉토리 삭제 (최신 1개 제외)
        ls -1dt */ | tail -n +2 | xargs rm -rf
        echo "오래된 배포 디렉토리 삭제 완료"
    fi
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
    # 이전 node_modules는 deploy.sh에서 다시 설치되므로 여기서는 건드리지 않음
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
