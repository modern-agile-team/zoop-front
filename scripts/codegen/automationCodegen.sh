#!/bin/bash

createPR() {
    # PR 생성 로직
    gh pr create --base develop --title "chore: 코드젠" --body "/reviewbot: ignore \n Generated server specifications update" --head "$new_branch"
    if [ $? -eq 0 ]; then
        echo "PR created successfully."
    else
        echo "Failed to create PR."
        git checkout "$original_branch"
        return 1
    fi  
}

# 현재 브랜치 이름 저장
original_branch=$(git rev-parse --abbrev-ref HEAD)
echo "Current branch is $original_branch."

# develop 브랜치로 이동
git checkout develop

# 최신 변경사항 가져오기
git pull origin develop

# 새 브랜치 생성 및 체크아웃
new_branch="chore/server_spec_$(date +%Y%m%d_%H%M)"
git checkout -b "$new_branch"

# 필요한 명령어 실행
yarn codegen:sync
sleep 2

yarn codegen:all
sleep 2

# 변경 사항이 있는지 확인하고, 있으면 커밋 및 푸시
if [[ $(git status --porcelain) ]]; then
    git add .
    git commit -m "chore: Update server specifications"
    git push --set-upstream origin "$new_branch" --no-verify
else
    echo "No changes to commit."
fi

# GitHub 인증 상태 확인
gh auth status
if [ $? -eq 0 ]; then
    echo "GitHub authentication succeeded."
    createPR
else
    echo "GitHub authentication failed. Please authenticate using 'gh auth login'."
    exit 1
fi

# TypeScript 컴파일 시도
tsc_output=$(yarn tsc -b --noEmit 2>&1)
tsc_exit_code=$?

# 컴파일 에러가 있는 경우 PR에 코멘트 추가
if [ $tsc_exit_code -ne 0 ]; then
    echo "TypeScript compilation errors detected."
    # PR 번호 추출
    pr_number=$(echo $pr_url | grep -o '[^/]*$')
    # 에러 메시지를 PR에 코멘트로 추가
    echo $tsc_output
    gh pr comment "$pr_number" --body "TypeScript compilation errors: \n\`\`\`$tsc_output\`\`\`"
else
    echo "TypeScript compilation successful, no errors found."
    git checkout "$original_branch"
    git branch -d "$new_branch"
fi

