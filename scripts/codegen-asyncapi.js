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

    // 생성된 파일들 후처리
    postProcessGeneratedModels(modelsOutput);
    console.log(`✅ Models post-processed for ${projectName}`);
  } catch (error) {
    console.error(
      `❌ Error generating models for ${projectName}:`,
      error.message
    );
    return false;
  }

  return true;
}

// 생성된 모델 파일들 후처리 함수
function postProcessGeneratedModels(modelsDir) {
  if (!fs.existsSync(modelsDir)) {
    return;
  }

  const files = fs.readdirSync(modelsDir, { withFileTypes: true });

  files.forEach((file) => {
    if (file.isFile() && file.name.endsWith('.ts')) {
      const filePath = path.join(modelsDir, file.name);
      let content = fs.readFileSync(filePath, 'utf-8');

      // 문제점들 수정
      content =
        content
          // Map<string, any> -> Record<string, unknown> 변경
          .replace(/Map<string,\s*any>/g, 'Record<string, unknown>')
          // any -> unknown 변경 (단, ...args: any[]는 유지)
          .replace(/:\s*any(?!\[\])/g, ': unknown')
          // export { Interface } -> export type { Interface } 형태로 변경
          .replace(/export\s*{\s*([^}]+)\s*}/g, (match, interfaceName) => {
            return `export type { ${interfaceName.trim()} }`;
          })
          // additionalProperties 제거 (optional)
          .replace(/\s*additionalProperties\?\:\s*[^;]+;/g, '')
          // 빈 줄 정리
          .replace(/\n\n+/g, '\n\n')
          // 파일 끝 정리
          .trim() + '\n';

      fs.writeFileSync(filePath, content);
    }
  });
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

  // 모델 타입들 re-export
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

  content += '\n';

  // ServerToClientEventNames와 ClientToServerEventNames enum 생성
  const channels = Object.keys(asyncApiSpec.channels || {});

  // ServerToClientEventNames (publish 이벤트들)
  const serverToClientChannels = channels.filter((channelName) => {
    return asyncApiSpec.channels[channelName].publish;
  });

  if (serverToClientChannels.length > 0) {
    content += 'export const enum ServerToClientEventNames {\n';
    serverToClientChannels.forEach((channelName) => {
      const enumKey = channelName.toUpperCase().replace(/[.-]/g, '_');
      content += `  ${enumKey} = '${channelName}',\n`;
    });
    content += '}\n\n';
  }

  // ClientToServerEventNames (subscribe 이벤트들)
  const clientToServerChannels = channels.filter((channelName) => {
    return asyncApiSpec.channels[channelName].subscribe;
  });

  content += 'export const enum ClientToServerEventNames {\n';
  if (clientToServerChannels.length > 0) {
    clientToServerChannels.forEach((channelName) => {
      const enumKey = channelName.toUpperCase().replace(/[.-]/g, '_');
      content += `  ${enumKey} = '${channelName}',\n`;
    });
  } else {
    content +=
      '  // 현재 클라이언트에서 서버로 보내는 이벤트가 정의되지 않았습니다\n';
    content +=
      '  // AsyncAPI 스펙에서 subscribe 이벤트를 추가하면 여기에 자동으로 생성됩니다\n';
  }
  content += '}\n\n';

  // 유틸리티 타입들
  content += '// 유틸리티 타입들\n';
  content +=
    'export type ServerToClientEventData<T extends ServerToClientEventNames> = Parameters<\n';
  content += '  ServerToClientEvents[T]\n';
  content += '>[0];\n\n';

  content +=
    'export type ClientToServerEventData<T extends ClientToServerEventNames> = ClientToServerEvents[T];\n\n';

  // ServerToClientEvents 인터페이스 생성
  content += '// Socket.io 이벤트 맵 정의\n';
  content += 'export interface ServerToClientEvents {\n';

  // 채널별 이벤트 타입 매핑 (publish = 서버에서 클라이언트로)
  Object.entries(asyncApiSpec.channels || {}).forEach(
    ([channelName, channelSpec]) => {
      if (channelSpec.publish) {
        const payloadRef = channelSpec.publish.message?.payload?.$ref;
        if (payloadRef) {
          const eventType = payloadRef.split('/').pop();
          const description = channelSpec.publish.description || '';
          const enumKey = channelName.toUpperCase().replace(/[.-]/g, '_');
          content += `  /** ${description} */\n`;
          content += `  [ServerToClientEventNames.${enumKey}]: (data: ${eventType}) => void;\n`;
        }
      }
    }
  );

  content += '}\n\n';

  // ClientToServerEvents는 subscribe 이벤트들로 구성
  content += 'export interface ClientToServerEvents {\n';

  let hasClientEvents = false;
  Object.entries(asyncApiSpec.channels || {}).forEach(
    ([channelName, channelSpec]) => {
      if (channelSpec.subscribe) {
        const payloadRef = channelSpec.subscribe.message?.payload?.$ref;
        if (payloadRef) {
          const eventType = payloadRef.split('/').pop();
          const description = channelSpec.subscribe.description || '';
          const enumKey = channelName.toUpperCase().replace(/[.-]/g, '_');
          content += `  /** ${description} */\n`;
          content += `  [ClientToServerEventNames.${enumKey}]: (data: ${eventType}) => void;\n`;
          hasClientEvents = true;
        }
      }
    }
  );

  if (!hasClientEvents) {
    content += '[eventName: string]: unknown;';
  }

  content += '}\n\n';

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
