# 🎯 Quiz Game IO Frontend

실시간 멀티플레이어 퀴즈 게임 플랫폼의 프론트엔드 애플리케이션입니다.

## 🚀 주요 기능

- 🎮 **실시간 퀴즈 배틀**: 친구들과 함께하는 스릴 넘치는 실시간 퀴즈 대결
- 🏆 **게임룸 시스템**: 방 생성 및 참여를 통한 다중 사용자 게임 환경
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 디바이스 지원
- ⚡ **실시간 상태 동기화**: 게임 진행 상황 실시간 업데이트
- 🎨 **현대적인 UI/UX**: Tailwind CSS와 Radix UI를 활용한 세련된 인터페이스

## 🛠 기술 스택

### Core

- **React 19** - 최신 React 기능 활용
- **TypeScript** - 타입 안정성 보장
- **Vite** - 빠른 개발 서버 및 빌드 도구

### 라우팅 & 상태관리

- **TanStack Router** - 파일 기반 라우팅 시스템
- **TanStack Query** - 서버 상태 관리

### 스타일링 & UI

- **Tailwind CSS 4.0** - 유틸리티 우선 CSS 프레임워크
- **Radix UI** - 접근성을 고려한 UI 컴포넌트
- **Lucide React** - 아이콘 라이브러리
- **class-variance-authority** - 조건부 스타일링

### 개발도구

- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **Husky** - Git 훅 관리
- **Commitlint** - 커밋 메시지 규칙 적용
- **Vitest** - 테스트 프레임워크

## 🚦 시작하기

### 필요 조건

- Node.js 18+
- Yarn 4.9.1+

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행 (포트: 3000)
yarn dev
# 또는
yarn start
```

### 빌드

```bash
# 프로덕션 빌드
yarn build

# 빌드 파일 미리보기
yarn serve
```

## 📁 프로젝트 구조

```
src/
├── apps/                    # 앱별 기능 모듈
│   ├── home/               # 홈페이지 관련 컴포넌트
│   ├── lobby/              # 로비 관련 컴포넌트 (방 생성/참여)
│   └── room/               # 게임룸 관련 컴포넌트
├── routes/                 # TanStack Router 라우트 정의
├── shared/                 # 공통 컴포넌트 및 유틸리티
│   ├── components/         # 재사용 가능한 UI 컴포넌트
│   ├── hooks/              # 공통 커스텀 훅
│   └── utils/              # 유틸리티 함수
└── lib/                    # 라이브러리 설정 및 유틸리티
```

## 🧪 테스트

```bash
# 테스트 실행
yarn test

# 타입 체크
yarn type-check
```

## 🎨 코드 품질

```bash
# 린팅
yarn lint

# 코드 포맷팅
yarn format

# 린팅 + 포맷팅 자동 수정
yarn check
```

## 📝 커밋 가이드

이 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/)를 따릅니다.

```bash
# 대화형 커밋 메시지 작성 도우미
yarn commit

# 커밋 메시지 도움말 보기
yarn commit:help
```

### 커밋 메시지 형식

```
<타입>: <설명> #<이슈번호>

예시:
feat: 사용자 로그인 기능 추가 #123
fix: 헤더 컴포넌트 버그 수정 #456
docs: README 파일 업데이트 #789
```

## 🔄 자동화된 이슈 관리

이 프로젝트는 GitHub Actions를 통한 자동화된 워크플로우를 제공합니다:

- **자동 이슈 연결**: 브랜치나 PR 생성 시 이슈 자동 연결
- **자동 라벨링**: 작업 시작 시 `in-progress`, PR 머지 시 `completed` 라벨 자동 추가
- **자동 담당자 지정**: 브랜치/PR 생성자를 이슈 담당자로 자동 지정
- **자동 이슈 닫기**: 연결된 PR이 머지될 때 이슈 자동 닫기

### 빠른 가이드:

1. **브랜치 생성**: `git checkout -b feature/123-new-feature`
2. **PR 생성**: 제공된 템플릿을 사용하고 `Closes #123`으로 이슈 연결
3. **PR 머지**: 이슈가 자동으로 닫히고 완료 표시됨

자세한 설정 및 사용법은 [GitHub Actions 가이드](./docs/github-actions.md)를 참조하세요.

## 🎯 주요 페이지

### 🏠 홈페이지 (`/`)

- 게임 소개 및 주요 기능 안내
- 로그인/회원가입 버튼
- 게임 통계 정보

### 🏛 로비 (`/lobby`)

- 게임룸 목록 및 검색
- 새 게임룸 생성
- 참여자 정보 표시

### 🎮 게임룸 (`/room/:roomId`)

- 실시간 퀴즈 게임 진행
- 참여자 상태 및 점수 표시
- 게임 결과 및 통계

## 🎨 반응형 디자인

이 애플리케이션은 다음과 같은 반응형 브레이크포인트를 사용합니다:

- **Mobile**: < 768px
- **Tablet**: 768px ~ 1024px
- **Desktop**: > 1024px

각 컴포넌트는 디바이스별로 최적화된 UI를 제공합니다.

## 🔧 설정 파일

- `vite.config.js` - Vite 설정
- `tailwind.config.ts` - Tailwind CSS 설정
- `tsconfig.json` - TypeScript 설정
- `eslint.config.js` - ESLint 설정
- `prettier.config.js` - Prettier 설정
- `commitlint.config.cjs` - Commitlint 설정

## 🤝 기여하기

1. 이슈를 생성하거나 기존 이슈를 선택합니다
2. 해당 이슈 번호로 브랜치를 생성합니다: `feature-이슈번호/설명`
3. 변경사항을 커밋합니다 (커밋 컨벤션 준수)
4. PR을 생성하고 이슈를 연결합니다
5. 코드 리뷰 후 머지됩니다

## 📚 참고 자료

- [TanStack Router 공식 문서](https://tanstack.com/router)
- [TanStack Query 공식 문서](https://tanstack.com/query)
- [Tailwind CSS 공식 문서](https://tailwindcss.com)
- [Radix UI 공식 문서](https://radix-ui.com)
- [Vite 공식 문서](https://vitejs.dev)

## 📄 라이선스

이 프로젝트는 MIT 라이선스하에 배포됩니다.
