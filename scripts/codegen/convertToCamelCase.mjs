import { camelCase } from 'change-case';
import { globSync } from 'glob';
import * as fs from 'node:fs';
import path from 'path';
import * as ts from 'typescript';

const convertFile = (filePath) => {
  const sourceCode = fs.readFileSync(filePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceCode,
    ts.ScriptTarget.Latest,
    true
  );

  const transformer = (context) => {
    return (rootNode) => {
      function visit(node) {
        if (ts.isPropertySignature(node) || ts.isPropertyDeclaration(node)) {
          const name = node.name.getText(sourceFile);
          if (name.includes('_')) {
            return ts.factory.updatePropertySignature(
              node,
              node.modifiers,
              ts.factory.createIdentifier(camelCase(name)),
              node.questionToken,
              node.type
            );
          }
        }
        return ts.visitEachChild(node, visit, context);
      }
      return ts.visitNode(rootNode, visit);
    };
  };

  console.log(
    '>>> 타입 및 인터페이스의 프로퍼티 이름을 카멜 케이스로 변환합니다...'
  );

  let transformed;
  try {
    const result = ts.transform(sourceFile, [transformer]);
    const printer = ts.createPrinter();
    transformed = printer.printFile(result.transformed[0]);

    if (!transformed) {
      throw new Error('변환 결과가 없습니다.');
    }
  } catch (error) {
    console.error(error);
  }

  fs.writeFileSync(filePath, transformed);
  console.log('>>> 변경 사항이 저장되었습니다.');
};

// 주어진 경로의 모든 *.schemas.ts 파일에 대해 변환을 적용하는 함수
export const convertAllSchemasToCamelCase = (baseDir) => {
  console.log('>>> 변환을 시작합니다...');

  // 경로 내의 모든 *.schemas.ts 파일을 찾습니다.
  globSync(path.join(baseDir, '*.schemas.ts')).forEach((filePath) => {
    console.log(`>>> 파일 변환 중: ${filePath}`);
    convertFile(filePath);
  });

  // 또는 경로 하위의 models 디렉토리 내의 모든 *.ts 파일을 찾습니다.
  globSync(path.join(baseDir, 'models', '*.ts')).forEach((filePath) => {
    console.log(`>>> 파일 변환 중: ${filePath}`);
    convertFile(filePath);
  });

  console.log('>>> 모든 파일이 성공적으로 변환되었습니다.');
};
