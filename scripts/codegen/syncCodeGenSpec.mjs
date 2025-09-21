import fs from 'fs';

// OpenAPI 스펙이 있는 URL
const SPEC_URL = {
  API: 'https://lsh.taild0f974.ts.net/backend/swagger-json',
  SOCKET: 'https://lsh.taild0f974.ts.net/backend/async-doc-json',
};

// 스펙을 저장할 파일 경로
const SPEC_WRITE_PATH = {
  API: 'src/lib/orval/spec.json',
  SOCKET: 'src/lib/asyncApi/spec.json',
};

console.log('API 스펙을 가져오는 중...');

const getSpec = async (type) => {
  return new Promise((resolve, reject) => {
    fetch(SPEC_URL[type])
      .then((response) => response.json())
      .then((data) => {
        const jsonContent = JSON.stringify(data, null, 2);
        // 해당하는 폴더가 없으면 생성
        const dirPath = SPEC_WRITE_PATH[type].split('/').slice(0, -1).join('/');
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
          console.log(`폴더가 생성되었습니다. ${dirPath}`);
        }

        fs.writeFile(SPEC_WRITE_PATH[type], jsonContent, 'utf8', (err) => {
          if (err) {
            console.log('파일 저장 중 에러 발생:', err);
            reject(err);
          } else {
            console.log('spec.json 파일이 성공적으로 저장되었습니다.');
            resolve();
          }
        });
      })
      .catch((error) => {
        console.log('API 요청 중 에러 발생:', error);
        reject(error);
      });
  });
};

const results = await Promise.allSettled([getSpec('API'), getSpec('SOCKET')]);

results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log(result);
    console.log(`작업 ${index + 1} 성공:`, result.value);
  } else {
    console.error(`작업 ${index + 1} 실패:`, result.reason);
  }
});
