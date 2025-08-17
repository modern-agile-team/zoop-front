import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { convertAllSchemasToCamelCase } from './convertToCamelCase.mjs';

const GEN_PATH = {
  API: '../../src/lib/orval/api/_generated',
  SOCKET: '../../src/lib/orval/socket/_generated',
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_PATH = {
  API: path.join(__dirname, GEN_PATH.API),
  SOCKET: path.join(__dirname, GEN_PATH.SOCKET),
};

await Promise.allSettled([
  convertAllSchemasToCamelCase(BASE_PATH.API),
  convertAllSchemasToCamelCase(BASE_PATH.SOCKET),
]);
