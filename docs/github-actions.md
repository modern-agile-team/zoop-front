# GitHub Actions Workflow 설정 가이드

이 프로젝트에는 다음과 같은 GitHub Actions 워크플로우가 설정되어 있습니다.

## 워크플로우 목록

### 1. PR Build Check (`pr-build-check.yml`)

- **트리거**: `main` 또는 `develop` 브랜치로의 PR 생성/업데이트 시
- **목적**: PR이 병합되기 전에 빌드가 성공하는지 검증
- **실행 내용**:
  - Node.js 18.x, 20.x 매트릭스 테스트
  - 의존성 설치
  - 린팅 검사
  - 테스트 실행
  - 프로젝트 빌드

### 2. Main Build (`main-build.yml`)

- **트리거**: `main` 또는 `develop` 브랜치에 직접 푸시 시
- **목적**: 메인 브랜치의 빌드 상태 확인 및 아티팩트 저장
- **실행 내용**:
  - 의존성 설치
  - 린팅 검사
  - 테스트 실행
  - 프로젝트 빌드
  - 빌드 아티팩트 업로드 (7일 보관)

### 3. CI Pipeline (`ci.yml`)

- **트리거**: `main`/`develop` 브랜치 푸시 및 PR
- **목적**: 종합적인 CI/CD 파이프라인
- **실행 내용**:
  - 코드 품질 검사 (타입체크, 린팅, 포맷팅)
  - 테스트 실행 및 커버리지 수집
  - 빌드 검증
  - 보안 감사
  - 최종 상태 확인

## 브랜치 보호 규칙 설정

GitHub 저장소에서 다음과 같이 브랜치 보호 규칙을 설정하는 것을 권장합니다:

### main 브랜치 보호

1. GitHub 저장소 → Settings → Branches
2. "Add rule" 클릭
3. Branch name pattern: `main`
4. 다음 옵션들을 체크:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Required status checks:
     - `Build and Test (18.x)`
     - `Build and Test (20.x)`
     - `Build Status Check`
     - `CI Success` (ci.yml 사용 시)
   - ✅ Restrict pushes that create files
   - ✅ Do not allow bypassing the above settings

### develop 브랜치 보호

1. 동일한 방식으로 `develop` 브랜치에도 적용
2. 필요에 따라 더 유연한 규칙 적용 가능

## 로컬 개발 시 체크리스트

PR을 생성하기 전에 로컬에서 다음 명령어들을 실행하여 CI 통과를 확인하세요:

```bash
# 의존성 설치
yarn install

# 코드 포맷팅 및 린팅
yarn check

# 테스트 실행
yarn test

# 빌드 검증
yarn build
```

## 문제 해결

### 빌드 실패 시

1. 로컬에서 `yarn build` 명령어로 동일한 오류 재현
2. TypeScript 오류는 `npx tsc --noEmit`로 확인
3. 린팅 오류는 `yarn lint --fix`로 자동 수정 시도

### 테스트 실패 시

1. 로컬에서 `yarn test` 실행
2. 특정 테스트만 실행: `yarn test -- --testNamePattern="테스트명"`

### 의존성 문제

1. `yarn install --immutable` 명령어로 lockfile 기준 설치
2. Node.js 버전 확인 (18.x 또는 20.x 권장)

## 워크플로우 커스터마이징

필요에 따라 다음을 수정할 수 있습니다:

- **Node.js 버전**: `.github/workflows/*.yml` 파일의 `node-version` 수정
- **테스트 명령어**: `package.json`의 스크립트 수정
- **브랜치 범위**: `on.push.branches` 및 `on.pull_request.branches` 수정
- **캐시 설정**: 빌드 속도 향상을 위한 추가 캐시 설정

## 성능 최적화

- 의존성 캐시 사용으로 설치 시간 단축
- 매트릭스 빌드로 여러 Node.js 버전 병렬 테스트
- 아티팩트 업로드로 빌드 결과물 보관
- 조건부 실행으로 불필요한 작업 스킵
