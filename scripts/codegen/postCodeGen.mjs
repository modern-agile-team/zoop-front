import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { convertAllSchemasToCamelCase } from './convertToCamelCase.mjs';

const GEN_PATH = '../../src/api/_generated';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_PATH = path.join(__dirname, GEN_PATH);

await Promise.allSettled([convertAllSchemasToCamelCase(BASE_PATH)]);
