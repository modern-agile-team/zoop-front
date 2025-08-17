#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Config 파일 읽기
function loadConfig() {
  try {
    const configPath = path.join(process.cwd(), 'asyncapi.config.json');
    const configContent = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(configContent);
  } catch (error) {
    console.error('❌ asyncapi.config.json을 찾을 수 없습니다.');
    process.exit(1);
  }
}

// 디렉토리 생성 함수
function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// AsyncAPI CLI로 모델 생성
function generateModels(projectName, config) {
  const { input, output, options } = config;

  console.log(`🔄 Generating models for project: ${projectName}`);

  const modelsOutput = output.models;
  ensureDirectoryExists(modelsOutput);

  const cmd = [
    'npx @asyncapi/cli generate models typescript',
    input,
    `-o ${modelsOutput}`,
    `--tsModelType ${options.modelType}`,
    options.includeComments ? '--tsIncludeComments' : '',
    `--tsExportType ${options.exportType}`,
    `--tsModuleSystem ${options.moduleSystem}`,
  ]
    .filter(Boolean)
    .join(' ');

  try {
    execSync(cmd, { stdio: 'inherit' });
    console.log(`✅ Models generated successfully for ${projectName}`);
  } catch (error) {
    console.error(
      `❌ Error generating models for ${projectName}:`,
      error.message
    );
    return false;
  }

  return true;
}

// Socket 이벤트 타입과 클라이언트 생성
function generateSocketTypes(projectName, config) {
  const { input, output } = config;

  console.log(`🔄 Generating Socket types for project: ${projectName}`);

  try {
    // AsyncAPI 스펙 읽기
    const specContent = fs.readFileSync(input, 'utf-8');
    const asyncApiSpec = JSON.parse(specContent);

    // Socket 이벤트 타입 생성
    const typesContent = generateSocketEventTypes(asyncApiSpec, output.models);

    ensureDirectoryExists(output.types);
    fs.writeFileSync(output.types, typesContent);

    console.log(`✅ Socket types generated successfully for ${projectName}`);
    return true;
  } catch (error) {
    console.error(
      `❌ Error generating Socket types for ${projectName}:`,
      error.message
    );
    return false;
  }
}

// Socket 이벤트 타입 생성 함수
function generateSocketEventTypes(asyncApiSpec, modelsPath) {
  const modelsDir = path.basename(modelsPath);
  let content = '// Auto-generated Socket event types\n\n';

  // 모델 타입들 import
  const schemas = Object.keys(asyncApiSpec.components?.schemas || {});
  schemas.forEach((schemaName) => {
    content += `export type { ${schemaName} } from './${modelsDir}/${schemaName}';\n`;
  });

  content += '\n';

  // 이벤트별 import (타입 사용을 위해)
  const eventTypes = [];
  schemas.forEach((schemaName) => {
    if (schemaName.includes('SocketEvent')) {
      content += `import type { ${schemaName} } from './${modelsDir}/${schemaName}';\n`;
      eventTypes.push(schemaName);
    }
  });

  content += '\n// Socket.io 이벤트 맵 정의\n';
  content += 'export interface ServerToClientEvents {\n';

  // 채널별 이벤트 타입 매핑
  Object.entries(asyncApiSpec.channels || {}).forEach(
    ([channelName, channelSpec]) => {
      if (channelSpec.publish) {
        const payloadRef = channelSpec.publish.message?.payload?.$ref;
        if (payloadRef) {
          const eventType = payloadRef.split('/').pop();
          content += `  '${channelName}': (data: ${eventType}) => void;\n`;
        }
      }
    }
  );

  content += '}\n\n';
  content += 'export interface ClientToServerEvents {\n';
  content += '  // 클라이언트에서 서버로 보내는 이벤트들\n';
  content +=
    '  // eslint-disable-next-line @typescript-eslint/no-explicit-any\n';
  content += '  [event: string]: (...args: any[]) => void;\n';
  content += '}\n';

  return content;
}

// 메인 실행 함수
function main() {
  const config = loadConfig();
  const projects = config.projects;

  if (!projects || Object.keys(projects).length === 0) {
    console.error('❌ No projects found in asyncapi.config.json');
    process.exit(1);
  }

  let allSuccess = true;

  Object.entries(projects).forEach(([projectName, projectConfig]) => {
    console.log(`\n📦 Processing project: ${projectName}`);

    // 1. 모델 생성
    const modelsSuccess = generateModels(projectName, projectConfig);
    if (!modelsSuccess) {
      allSuccess = false;
      return;
    }

    // 2. Socket 타입 생성
    const typesSuccess = generateSocketTypes(projectName, projectConfig);
    if (!typesSuccess) {
      allSuccess = false;
      return;
    }
  });

  if (allSuccess) {
    console.log('\n🎉 All AsyncAPI code generation completed successfully!');
  } else {
    console.log('\n❌ Some code generation steps failed.');
    process.exit(1);
  }
}

// 실행
main();
