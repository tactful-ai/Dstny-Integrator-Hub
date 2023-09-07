import * as fs from 'fs-extra';

const generateAddAuthHeaders = async (
  headers: Record<string, string>,
  appKey: string
) => {
  const commonDir = `./src/apps/${appKey}/common`;
  await fs.ensureDir(commonDir);

  const headerLines = Object.entries(headers)
    .map(([headerName, authDataKey]) => {
      return `requestConfig.headers['${headerName}'] = ${authDataKey};`;
      // return `requestConfig.headers['${headerName}'] = $.auth.data.${authDataKey} as string;`;
    })
    .join('\n');

  const code = `
import { TBeforeRequest } from '@automatisch/types';

const addAuthHeaders: TBeforeRequest = ($, requestConfig) => {
  if (requestConfig.headers) {
    if ($.auth.data) {
      ${headerLines}
    }
  } 
  return requestConfig;
};

export default addAuthHeaders;
  `;

  await fs.promises.writeFile(`${commonDir}/add-headers.ts`, code, 'utf-8'); // Use fs.promises.writeFile
};

export default generateAddAuthHeaders;
