#!/bin/bash

echo "=========================================="
echo "디스크 공간 정리 시작..."
echo "=========================================="

# 현재 디스크 사용량 확인
echo "현재 디스크 사용량:"
df -h

# CodeDeploy 오래된 배포 파일 정리
echo "CodeDeploy 배포 파일 정리 중..."
if [ -d "/opt/codedeploy-agent/deployment-root" ]; then
    cd /opt/codedeploy-agent/deployment-root
    # 오래된 배포 디렉토리 삭제 (최신 1개만 유지)
    DEPLOY_COUNT=$(ls -1d */ 2>/dev/null | wc -l)
    if [ "$DEPLOY_COUNT" -gt 1 ]; then
        ls -1dt */ 2>/dev/null | tail -n +2 | xargs rm -rf 2>/dev/null || true
        echo "오래된 배포 파일 삭제 완료 (최신 1개 유지)"
    else
        echo "배포 파일이 1개만 있어 정리할 필요 없음"
    fi
fi

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
