# GitHub Actions Workflow 설정 가이드

이 프로젝트에는 다음과 같은 GitHub Actions 워크플로우가 설정되어 있습니다.

## 워크플로우 목록

### 🔄 Issue Management (`issue-management.yml`)

- **트리거**: PR 생성/병합/재개, 브랜치 생성 시
- **목적**: 이슈와 PR 생명주기 자동 관리
- **실행 내용**:
  - **PR 생성 시**: 연결된 이슈에 `in-progress` 라벨 추가 및 PR 작성자를 담당자로 지정
  - **브랜치 생성 시**: 브랜치명에 포함된 이슈 번호로 자동 라벨링 및 담당자 지정
  - **PR 병합 시**: 연결된 이슈 자동 닫기 및 `completed` 라벨 추가
  - **PR 재개 시**: 연결된 이슈 재개 및 상태 복원

### 🪝 Git Hooks (Husky) (`husky`)

- **트리거**: Git 이벤트 발생 시 (로컬)
- **목적**: 로컬에서 코드 품질 보장 및 커밋 메시지 검증
- **실행 내용**:
  - **Pre-push**: 타입 체크 및 린트 검사
  - **Commit-msg**: 커밋 메시지 포맷 검증 (Conventional Commits)

자세한 사용법은 [Husky Guide](./husky-guide.md)를 참조하세요.

- **트리거**: 수동 실행 또는 워크플로우 파일 변경 시
- **목적**: 프로젝트에 필요한 라벨 자동 생성/업데이트
- **생성되는 라벨**:
  - `in-progress`: 현재 작업 중인 이슈
  - `completed`: 완료된 이슈
  - `bug`: 버그 관련 이슈
  - `feature`: 새로운 기능 관련 이슈
  - `enhancement`: 기능 개선 관련 이슈

## 사용법

### PR 템플릿 사용하기

프로젝트에는 다음과 같은 PR 템플릿이 제공됩니다:

#### 1. **기본 템플릿** (자동 선택)

PR을 생성할 때 자동으로 로드되는 기본 템플릿입니다.

#### 2. **상황별 템플릿** (선택 사용)

URL 파라미터를 사용해서 특정 템플릿을 선택할 수 있습니다:

- **버그 수정**: `?template=bug_fix.md`
- **새로운 기능**: `?template=feature.md`
- **리팩토링**: `?template=refactor.md`
- **핫픽스**: `?template=hotfix.md`

**사용 방법:**

```
https://github.com/modern-agile-team/quiz-game-io-front/compare/main...your-branch?template=feature.md
```

### 이슈 자동 관리 사용하기

#### 1. PR에서 이슈 연결하기

PR 본문에 다음과 같은 다양한 방식으로 이슈를 연결할 수 있습니다:

**영어 키워드:**

```
Closes #123
Fixes #456
Resolves #789
Fix #101
Close #202
Resolve #303
```

**간단한 참조:**

```
#123
#456 #789
```

**한국어 키워드:**

```
이슈 #123
이슈 456
Issue #789
```

**혼합 사용:**

```
이 PR은 다음 이슈들을 해결합니다:
- Closes #123 (로그인 버그)
- 이슈 #456 (UI 개선)
- #789
```

#### 2. 브랜치 명명 규칙

브랜치 이름에 이슈 번호를 포함하면 자동으로 라벨이 추가됩니다:

```bash
# 좋은 예시
git checkout -b feature/123-add-login-feature
git checkout -b bugfix/456-fix-header-bug
git checkout -b enhancement/789-improve-performance

# 이슈 번호가 자동으로 인식됩니다
```

#### 3. 워크플로우 동작

**브랜치 생성 시:**

- 브랜치명에서 이슈 번호 추출
- 해당 이슈에 `in-progress` 라벨 추가
- 브랜치 생성자를 이슈 담당자로 지정

**PR 생성 시:**

- PR 본문에서 연결된 이슈 번호 추출
- 해당 이슈에 `in-progress` 라벨 추가
- PR 작성자를 이슈 담당자로 지정

**PR 병합 시:**

- 연결된 이슈 자동 닫기
- `in-progress` 라벨 제거 후 `completed` 라벨 추가
- 이슈에 완료 코멘트 자동 추가

**PR 재개 시:**

- 연결된 이슈 재개
- `completed` 라벨 제거 후 `in-progress` 라벨 추가

### 라벨 설정하기

처음 설정 시 다음 중 하나를 실행하세요:

1. **수동 실행**: GitHub Actions 탭에서 "Setup Repository Labels" 워크플로우를 수동으로 실행
2. **자동 실행**: `setup-labels.yml` 파일을 수정하고 푸시하면 자동 실행

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
