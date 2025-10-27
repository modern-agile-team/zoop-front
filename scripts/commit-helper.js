import chalk from 'chalk';
import { execSync } from 'child_process';
import inquirer from 'inquirer';

// 커밋 타입 정의
const types = [
  {
    value: 'base',
    name: 'base:     베이스 브랜치에서 작업한 경우',
  },
  {
    value: 'feat',
    name: 'feat:     새로운 기능 추가',
  },
  {
    value: 'fix',
    name: 'fix:      버그 수정',
  },
  {
    value: 'docs',
    name: 'docs:     문서 변경',
  },
  {
    value: 'style',
    name: 'style:    코드 포맷팅, 세미콜론 누락 등',
  },
  {
    value: 'refactor',
    name: 'refactor: 코드 리팩토링',
  },
  {
    value: 'test',
    name: 'test:     테스트 코드',
  },
  {
    value: 'chore',
    name: 'chore:    기타 변경사항 (빌드, 패키지 매니저 등)',
  },
  {
    value: 'perf',
    name: 'perf:     성능 개선',
  },
  {
    value: 'ci',
    name: 'ci:       CI 설정 변경',
  },
  {
    value: 'build',
    name: 'build:    빌드 시스템 변경',
  },
  {
    value: 'revert',
    name: 'revert:   이전 커밋 되돌리기',
  },
];

async function createCommit() {
  console.log(chalk.blue('\n📝 커밋 메시지 작성 도우미\n'));

  try {
    // 변경사항 확인 (staged 변경사항만 확인)
    const status = execSync('git diff --cached --name-only', {
      encoding: 'utf8',
    });
    const hasChanges = status.trim().length > 0;

    if (!hasChanges) {
      console.log(chalk.yellow('⚠️  커밋할 staged 변경사항이 없습니다.'));
    }

    const branchName = execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf8',
    }).trim();
    const issueNumberMatch = branchName.match(/-(\d+)/);
    const defaultIssueNumber = issueNumberMatch
      ? issueNumberMatch[1]
      : undefined;

    const questions = [
      {
        type: 'list',
        name: 'type',
        message: '커밋 타입을 선택하세요:',
        choices: types,
      },
      {
        type: 'input',
        name: 'subject',
        message: '커밋 메시지를 입력하세요 (간결하고 명확하게):',
        validate: function (value) {
          if (value.length === 0) {
            return '커밋 메시지는 필수입니다.';
          }
          if (value.length > 80) {
            return '커밋 메시지는 80자를 넘지 않아야 합니다.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'issueNumber',
        message: `이슈 번호를 입력하세요 (숫자만) ${defaultIssueNumber ? `(기본값: ${defaultIssueNumber})` : ''}:`,
        default: defaultIssueNumber,
        validate: function (value) {
          if (!value) {
            return '이슈 번호는 필수입니다.';
          }
          if (!/^\d+$/.test(value)) {
            return '이슈 번호는 숫자만 입력해주세요.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'body',
        message: '상세 설명 (선택사항, Enter로 건너뛰기):',
      },
    ];

    // 빈 커밋 옵션 추가
    if (!hasChanges) {
      questions.push({
        type: 'confirm',
        name: 'allowEmpty',
        message: '빈 커밋을 생성하시겠습니까?',
        default: true,
      });
    }

    const answers = await inquirer.prompt(questions);

    // 커밋 메시지 생성
    const { type, subject, issueNumber, body, allowEmpty } = answers;
    let commitMessage = `${type}: ${subject} #${issueNumber}`;

    if (body) {
      commitMessage += `\n\n${body}`;
    }

    console.log(chalk.green('\n✨ 생성된 커밋 메시지:'));
    console.log(chalk.white('─'.repeat(50)));
    console.log(commitMessage);
    if (!hasChanges && allowEmpty) {
      console.log(chalk.cyan('📝 빈 커밋으로 생성됩니다.'));
    }
    console.log(chalk.white('─'.repeat(50)));

    const confirm = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'proceed',
        message: '이 커밋 메시지로 커밋하시겠습니까?',
        default: true,
      },
    ]);

    if (confirm.proceed) {
      try {
        let commitCommand = `git commit -m "${commitMessage.replace(/"/g, '\\"')}"`;

        // 빈 커밋인 경우 --allow-empty 플래그 추가
        if (!hasChanges && allowEmpty) {
          commitCommand = `git commit --allow-empty -m "${commitMessage.replace(/"/g, '\\"')}"`;
        }

        execSync(commitCommand, {
          stdio: 'inherit',
        });
        console.log(chalk.green('\n✅ 커밋이 성공적으로 완료되었습니다!'));
      } catch (error) {
        console.error(chalk.red('\n❌ 커밋 실행 중 오류가 발생했습니다:'));
        console.error(error.message);
      }
    } else {
      console.log(chalk.yellow('\n⏹️  커밋이 취소되었습니다.'));
    }
  } catch (error) {
    console.error(chalk.red('\n❌ 오류가 발생했습니다:'), error);
  }
}

// 현재 git 상태 확인
function checkGitStatus() {
  try {
    // Git 저장소인지만 확인 (변경사항 확인은 createCommit에서 처리)
    execSync('git rev-parse --git-dir', { encoding: 'utf8', stdio: 'pipe' });
  } catch (error) {
    console.error(
      chalk.red('❌ Git 저장소가 아니거나 Git이 설치되지 않았습니다.')
    );
    process.exit(1);
  }
}

// 메인 실행
async function main() {
  checkGitStatus();
  await createCommit();
}

// ES module에서의 메인 모듈 체크
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { checkGitStatus, createCommit };
