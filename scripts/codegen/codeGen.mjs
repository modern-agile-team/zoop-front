import { spawn } from 'child_process';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const GEN_PATH = '../../src/api/_generated';

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(import.meta.url);

const BASE_PATH = path.join(__dirname, GEN_PATH);

console.log('>>> generated 폴더를 삭제합니다.');

const refreshCodegen = async () => {
  return new Promise((resolve, reject) => {
    fs.rm(BASE_PATH, { recursive: true }, (err) => {
      if (err && err.code !== 'ENOENT') {
        console.log('>>> 폴더 삭제 중 에러 발생:', err);
        reject(err);
      } else {
        console.log('>>> 폴더 삭제가 성공적으로 완료되었습니다.');

        const process = spawn('bash');

        console.log('>>> orval을 실행합니다.');

        process.stdin.write('orval --config ./orval.config.ts');
        process.stdin.end();

        // 실시간 로그 출력 - 필요할 경우 활성화
        // process.stdout.on('data', (data) => {
        //   console.log(`[stdout]: ${data.toString()}`);
        // });

        process.stderr.on('data', (data) => {
          console.error(`[stderr]: ${data.toString()}`);
        });

        process.on('close', function (code) {
          console.log('>>> orval 실행이 완료되었습니다.');
          resolve();
        });

        process.on('error', function (err) {
          console.error('>>> orval 실행 중 에러 발생:', err);
          reject(err);
        });
      }
    });
  });
};

const results = await Promise.allSettled([refreshCodegen()]);

results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log(result);
    console.log(`작업 ${index + 1} 성공:`, result.value);
  } else {
    console.error(`작업 ${index + 1} 실패:`, result.reason);
  }
});
