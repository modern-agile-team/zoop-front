module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능
        'fix', // 버그 수정
        'docs', // 문서 변경
        'style', // 코드 포맷팅, 세미콜론 누락 등
        'refactor', // 코드 리팩토링
        'test', // 테스트 코드
        'chore', // 기타 변경사항 (빌드, 패키지 매니저 등)
        'perf', // 성능 개선
        'ci', // CI 설정 변경
        'build', // 빌드 시스템 변경
        'revert', // 이전 커밋 되돌리기
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    // 커밋 메시지에 이슈 번호 필수
    'subject-case': [0], // 대소문자 제한 해제 (한글 지원)
    'issue-number-required': [2, 'always']
  },
  plugins: [
    {
      rules: {
        'issue-number-required': (parsed, when, value) => {
          const { header } = parsed;
          // #숫자 패턴 검색 (예: #123, #1, #999)
          const issuePattern = /#\d+/;
          
          if (!issuePattern.test(header)) {
            return [
              false,
              '커밋 메시지에 이슈 번호가 필요합니다. (예: feat: 새 기능 추가 #123)'
            ];
          }
          return [true];
        }
      }
    }
  ]
};
