# 디스크 공간 부족 문제 해결 가이드

## 문제
"No space left on device" 에러 발생

## 원인
- CodeDeploy가 오래된 배포 파일을 계속 쌓아둠
- 로그 파일이 누적됨
- 임시 파일이 정리되지 않음

## 해결 방법

### 1. 자동 정리 (권장)
`cleanup-disk.sh` 스크립트가 BeforeInstall 단계에서 자동으로 실행됩니다.

### 2. EC2에서 수동 정리 (즉시 해결 필요 시)

SSH 접속 후 다음 명령어 실행:

```bash
# 1. 디스크 사용량 확인
df -h

# 2. CodeDeploy 오래된 배포 파일 삭제 (최신 3개만 유지)
cd /opt/codedeploy-agent/deployment-root
ls -1dt */ | tail -n +4 | xargs sudo rm -rf

# 3. CodeDeploy 로그 파일 정리
sudo find /opt/codedeploy-agent/deployment-root -name "*.log" -mtime +7 -delete
sudo find /var/log/aws/codedeploy-agent -name "*.log.*" -mtime +7 -delete

# 4. APT 캐시 정리 (Ubuntu)
sudo apt-get clean
sudo apt-get autoclean
sudo apt-get autoremove -y

# 5. 임시 파일 정리
sudo rm -rf /tmp/*
sudo rm -rf /var/tmp/*

# 6. 정리 후 확인
df -h
```

### 3. 큰 파일 찾기

```bash
# 가장 큰 디렉토리 찾기
sudo du -h --max-depth=1 / | sort -hr | head -20

# 가장 큰 파일 찾기
sudo find / -type f -size +100M -exec ls -lh {} \; 2>/dev/null | head -20
```

### 4. CodeDeploy 배포 루트만 정리

```bash
# 배포 루트 디렉토리 크기 확인
sudo du -sh /opt/codedeploy-agent/deployment-root/*

# 오래된 배포 삭제 (7일 이상)
find /opt/codedeploy-agent/deployment-root -maxdepth 1 -type d -mtime +7 -exec sudo rm -rf {} \;
```

## 예방 방법

1. `cleanup-disk.sh`가 BeforeInstall에서 자동 실행됨
2. 정기적으로 디스크 사용량 모니터링
3. EC2 인스턴스 볼륨 크기 증가 고려
