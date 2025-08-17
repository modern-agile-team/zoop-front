# GitHub Actions 환경 변수 설정 가이드

## 개요

배포 환경에서 환경 변수가 제대로 동작하도록 GitHub Repository Settings에서 Variables를 설정해야 합니다.

## Repository Variables 설정

GitHub Repository → Settings → Secrets and variables → Actions → Variables 탭에서 다음 변수들을 설정하세요:

## Environments 설정

GitHub Repository → Settings → Environments에서 다음 환경을 생성하세요:

## 워크플로우 동작 방식

### 자동 배포 (Push 기반)

- `develop` 브랜치 push → dev 환경 배포
- `main` 브랜치 push → prod 환경 배포

### 수동 배포 (Workflow Dispatch)

- Actions 탭에서 "CI/CD 파이프라인" 워크플로우 선택
- "Run workflow" 버튼 클릭
- 환경 선택 (dev 또는 prod)

## 빌드 스크립트 매핑

| 환경      | 워크플로우         | 빌드 명령어       | 환경 변수            |
| --------- | ------------------ | ----------------- | -------------------- |
| dev       | CICD.yml (dev)     | `yarn build:dev`  | DEV\_\* 변수 사용    |
| prod      | CICD.yml (prod)    | `yarn build:prod` | PROD\_\* 변수 사용   |
| PR 검증   | pr-build-check.yml | `yarn build`      | 하드코딩된 개발용 값 |
| Main 빌드 | main-build.yml     | `yarn build`      | VITE\_\* 변수 사용   |

## 환경 변수 우선순위

1. GitHub Actions 환경 변수 (가장 높음)
2. .env.prod / .env.dev 파일
3. 코드에서 설정한 기본값 (가장 낮음)

## 배포 전 체크리스트

- [ ] Repository Variables 설정 완료
- [ ] Environment 설정 완료 (dev, prod)
- [ ] 환경 변수 값 확인
- [ ] 배포 승인자 설정 (prod 환경)
- [ ] 빌드 테스트 실행

## 문제 해결

### 환경 변수가 undefined로 나타나는 경우

1. Repository Variables에서 변수명 확인
2. 변수명이 `VITE_` 접두사로 시작하는지 확인
3. 워크플로우에서 올바른 변수를 참조하는지 확인

### 빌드는 성공하지만 런타임에서 API 호출 실패

1. 빌드된 파일에서 환경 변수가 올바르게 치환되었는지 확인
2. 네트워크 설정 및 CORS 정책 확인
3. API 서버 상태 확인
