import { Response } from 'express';
import { IRequest } from '@automatisch/types';
import * as fs from 'fs-extra';
import type { IField } from '@automatisch/types';

import appendImportToFile from './add-import';
import appendModuleToExport from './add-export';
import getExistingAppKeys from './get-apps';
import generateAddAuthHeaders from './add-auth-headers';

import logger from '../../helpers/logger';

export default async (req: IRequest, res: Response) => {
  const appKey = req.params.appkey;

  try {
    const existingAppKeys = await getExistingAppKeys();

    if (!existingAppKeys.includes(appKey)) {
      res.status(404).send({
        success: false,
        message: `App with key ${appKey} does not exist.`,
      });
      return;
    }
    const authConfig: AuthConfig = req.body;
    const verifyCredentialsFileContent = generateVerifyCredentialsFile(
      authConfig,
      authConfig.fields
    );
    const isStillVerifiedFileContent = generateIsStillVerifiedFile();

    const authDir = `./src/apps/${appKey}/auth`;
    fs.ensureDirSync(authDir);

    fs.writeFileSync(
      `${authDir}/verify-credentials.ts`,
      verifyCredentialsFileContent,
      'utf-8'
    );
    fs.writeFileSync(
      `${authDir}/is-still-verified.ts`,
      isStillVerifiedFileContent,
      'utf-8'
    );

    generateIndexFile(authConfig, appKey, authDir);
    const newImport = `import auth from './auth';`;

    await appendImportToFile(`./src/apps/${appKey}/index.ts`, newImport);
    await appendModuleToExport(`./src/apps/${appKey}/index.ts`, 'auth');
    await generateAddAuthHeaders(req.body.headers, appKey);

    const commonImport = `import addAuthHeaders from './common/add-headers';`;
    await appendImportToFile(`./src/apps/${appKey}/index.ts`, commonImport);
    await appendModuleToExport(
      `./src/apps/${appKey}/index.ts`,
      'beforeRequest: [addAuthHeaders]'
    );

    res.sendStatus(200);
  } catch (error) {
    logger.error(`Error creating auth index file for app ${appKey}: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

interface AuthConfig {
  fields: IField[];
  verifyEndpoint: string;
}

function generateVerifyCredentialsFile(
  authConfig: AuthConfig,
  fields: IField[]
): string {
  const verifyCredentialsContent = `
import { IGlobalVariable } from '@automatisch/types';

const verifyCredentials = async ($: IGlobalVariable) => {
  await $.http.get('${authConfig.verifyEndpoint}');

  const authData = {
${fields
  .filter((field) => field.type === 'string')
  .map((field) => `    ${field.key}: $.auth.data.${field.key},`)
  .join('\n')}
  };

  await $.auth.set(authData);
};

export default verifyCredentials;
  `;

  return verifyCredentialsContent;
}

function generateIsStillVerifiedFile(): string {
  const isStillVerifiedContent = `import { IGlobalVariable } from '@automatisch/types';
  import verifyCredentials from './verify-credentials';

  const isStillVerified = async ($: IGlobalVariable) => {
    // Call the verifyCredentials function to ensure verification
    await verifyCredentials($);
    return true;
  };

  export default isStillVerified;
  `;

  return isStillVerifiedContent;
}

function generateIndexFile(
  authConfig: AuthConfig,
  appKey: string,
  authDir: string
): void {
  const fieldsContent = authConfig.fields
    .map((field) => {
      let fieldCode = `{
        key: '${field.key}',
        label: '${field.label}',
        type: '${field.type}' as const,`;

      if ('required' in field) {
        fieldCode += `
        required: ${field.required},`;
      }

      if ('readOnly' in field) {
        fieldCode += `
        readOnly: ${field.readOnly},`;
      }

      if ('value' in field) {
        fieldCode += `
        value: ${JSON.stringify(field.value)},`;
      }

      if (
        'placeholder' in field &&
        'type' in field &&
        field.type === 'string'
      ) {
        fieldCode += `
        placeholder: ${JSON.stringify(field.placeholder)},`;
      }

      if ('description' in field) {
        fieldCode += `
        description: '${field.description}',`;
      }

      if ('clickToCopy' in field) {
        fieldCode += `
        clickToCopy: ${field.clickToCopy},`;
      }

      fieldCode += `
      },`;
      return fieldCode;
    })
    .join('\n');

  const indexContent = `import verifyCredentials from './verify-credentials';
    import isStillVerified from './is-still-verified';

    export default {
      fields: [
        ${fieldsContent}
      ],
      verifyCredentials,
      isStillVerified,
    };
    `;

  fs.writeFileSync(`${authDir}/index.ts`, indexContent, 'utf-8');

  logger.debug(`Auth index file generated successfully at ${authDir}.`);
}
