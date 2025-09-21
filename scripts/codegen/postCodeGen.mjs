import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { convertAllSchemasToCamelCase } from './convertToCamelCase.mjs';

const GEN_PATH = {
  API: '../../src/lib/orval/_generated',
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_PATH = {
  API: path.join(__dirname, GEN_PATH.API),
};

await Promise.allSettled([convertAllSchemasToCamelCase(BASE_PATH.API)]);
