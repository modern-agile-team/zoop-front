/**
 * ESLint 커스텀 룰: getResponsiveClasses 함수의 결과를 받는 변수는 "Styles"로 끝나야 함
 */

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce that variables receiving getResponsiveClasses results end with "Styles"',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: 'code',
    schema: [],
    messages: {
      mustEndWithStyles:
        'Variables receiving getResponsiveClasses results must end with "Styles". Consider renaming "{{name}}" to "{{name}}Styles".',
    },
  },

  create(context) {
    return {
      // 변수 선언 검사
      VariableDeclarator(node) {
        // 변수에 값이 할당되고, 그 값이 함수 호출인 경우
        if (node.init && node.init.type === 'CallExpression') {
          const callExpression = node.init;

          // getResponsiveClasses 함수 호출인지 확인
          if (isGetResponsiveClassesCall(callExpression)) {
            const variableName = getVariableName(node.id);

            if (variableName && !variableName.endsWith('Styles')) {
              context.report({
                node: node.id,
                messageId: 'mustEndWithStyles',
                data: {
                  name: variableName,
                },
                fix(fixer) {
                  return fixer.replaceText(node.id, variableName + 'Styles');
                },
              });
            }
          }
        }
      },

      // 할당 표현식 검사 (예: existingVar = getResponsiveClasses(...))
      AssignmentExpression(node) {
        if (node.right && node.right.type === 'CallExpression') {
          const callExpression = node.right;

          if (isGetResponsiveClassesCall(callExpression)) {
            const variableName = getVariableName(node.left);

            if (variableName && !variableName.endsWith('Styles')) {
              context.report({
                node: node.left,
                messageId: 'mustEndWithStyles',
                data: {
                  name: variableName,
                },
                fix(fixer) {
                  return fixer.replaceText(node.left, variableName + 'Styles');
                },
              });
            }
          }
        }
      },
    };

    function isGetResponsiveClassesCall(callExpression) {
      try {
        // 직접 호출: getResponsiveClasses(...)
        if (
          callExpression.callee &&
          callExpression.callee.type === 'Identifier' &&
          callExpression.callee.name === 'getResponsiveClasses'
        ) {
          return true;
        }

        // 멤버 접근을 통한 호출: utils.getResponsiveClasses(...)
        if (
          callExpression.callee &&
          callExpression.callee.type === 'MemberExpression'
        ) {
          const { object, property } = callExpression.callee;
          if (property && property.name === 'getResponsiveClasses') {
            return true;
          }
        }

        return false;
      } catch (error) {
        // 에러가 발생하면 안전하게 false 반환
        return false;
      }
    }

    function getVariableName(node) {
      try {
        if (node && node.type === 'Identifier') {
          return node.name;
        }

        // 구조분해 할당의 경우는 일단 제외
        return null;
      } catch (error) {
        // 에러가 발생하면 안전하게 null 반환
        return null;
      }
    }
  },
};
