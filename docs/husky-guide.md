# Husky Git Hooks 설정 가이드

이 프로젝트에는 코드 품질을 보장하기 위한 Git hooks와 커밋 메시지 작성을 도와주는 도구들이 설정되어 있습니다.

## 🚀 커밋 메시지 작성 도구

### 🎯 대화형 커밋 도우미 (권장)

가장 쉽고 안전한 방법입니다:

```bash
yarn commit
```

이 명령어는:

- 📝 커밋 타입을 선택 메뉴로 제공
- ✅ 커밋 메시지 길이 자동 검증
- 🔢 이슈 번호 필수 입력 확인
- 👀 최종 커밋 전 미리보기 제공

### 🛠️ 기타 커밋 도구들

```bash
# Commitizen 사용 (고급 사용자용)
yarn commit:cz

# Commitlint 프롬프트 사용
yarn commit:prompt

# 커밋 도구 도움말 보기
yarn commit:help
```

### 📝 Git 커밋 템플릿

VS Code나 터미널에서 `git commit`을 실행하면 자동으로 커밋 메시지 템플릿이 표시됩니다:

```bash
git commit  # 템플릿이 포함된 에디터 열림
```

## 📋 설정된 Git Hooks

### 🚀 Pre-push Hook

푸시하기 전에 다음 검사를 자동으로 실행합니다:

- **TypeScript 타입 체크** (`yarn type-check`)
- **ESLint 코드 품질 검사** (`yarn lint`)

### 📝 Commit-msg Hook

커밋 메시지가 다음 규칙을 준수하는지 검증합니다:

- **Conventional Commits** 포맷 준수
- **최대 길이** 100자 제한
- **필수 타입** 사용

## 🎯 커밋 메시지 포맷

### 기본 포맷

```
<타입>: <설명> #<이슈번호>

[선택적 본문]

[선택적 푸터]
```

**⚠️ 중요**: 모든 커밋 메시지에는 이슈 번호가 반드시 포함되어야 합니다!

### 사용 가능한 타입

| 타입       | 설명             | 예시                                          |
| ---------- | ---------------- | --------------------------------------------- |
| `feat`     | 새로운 기능 추가 | `feat: 사용자 로그인 기능 추가 #123`          |
| `fix`      | 버그 수정        | `fix: 헤더 컴포넌트 렌더링 오류 수정 #456`    |
| `docs`     | 문서 변경        | `docs: README에 설치 가이드 추가 #789`        |
| `style`    | 코드 포맷팅      | `style: 들여쓰기 및 세미콜론 정리 #101`       |
| `refactor` | 코드 리팩토링    | `refactor: 사용자 인증 로직 개선 #202`        |
| `test`     | 테스트 코드      | `test: 로그인 컴포넌트 단위 테스트 추가 #303` |
| `chore`    | 기타 변경사항    | `chore: 패키지 버전 업데이트 #404`            |
| `perf`     | 성능 개선        | `perf: 이미지 로딩 성능 최적화 #505`          |
| `ci`       | CI 설정          | `ci: GitHub Actions 워크플로우 추가 #606`     |
| `build`    | 빌드 시스템      | `build: Webpack 설정 개선 #707`               |
| `revert`   | 커밋 되돌리기    | `revert: feat: 사용자 로그인 기능 추가 #808`  |

### 올바른 커밋 메시지 예시

```bash
# 좋은 예시 ✅
git commit -m "feat: 퀴즈 게임 점수 계산 기능 추가 #123"
git commit -m "fix: 모바일 환경에서 버튼 클릭 이벤트 오류 수정 #456"
git commit -m "docs: API 문서에 새로운 엔드포인트 추가 #789"

# 나쁜 예시 ❌
git commit -m "수정함"                                    # 타입과 이슈번호 없음
git commit -m "버그 고침"                                 # 타입과 이슈번호 없음
git commit -m "feat: 새로운 기능"                         # 이슈번호 없음
git commit -m "새로운 기능 추가 #123"                     # 타입 없음
```

## 🔧 로컬에서 테스트하기

### 타입 체크 실행

```bash
yarn type-check
```

### 린트 검사 실행

```bash
yarn lint
```

### 커밋 메시지 검증 테스트

```bash
# 올바른 메시지로 테스트
echo "feat: 테스트 기능 추가" | yarn commitlint

# 잘못된 메시지로 테스트
echo "잘못된 메시지" | yarn commitlint
```

## ⚠️ Hook 실패 시 대처 방법

### Pre-push 실패 시

1. **타입 오류**: TypeScript 타입 오류를 수정하세요
2. **린트 오류**: ESLint 규칙에 맞게 코드를 수정하거나 `yarn lint --fix` 실행

### Commit-msg 실패 시

1. 커밋 메시지를 올바른 포맷으로 다시 작성하세요
2. `git commit --amend -m "올바른 메시지"`로 수정 가능

## 🚫 Hook 우회 (권장하지 않음)

긴급한 상황에서만 사용하세요:

```bash
# Pre-push hook 우회
git push --no-verify

# Commit-msg hook 우회
git commit --no-verify -m "메시지"
```

## 🔄 Hook 비활성화/재활성화

```bash
# Hook 비활성화
yarn husky uninstall

# Hook 재활성화
yarn husky install
```
