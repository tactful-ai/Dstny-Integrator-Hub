import { Response, Request } from 'express';
import { IRequest } from '@automatisch/types';
import type { IApp } from '@automatisch/types';
import { addAppDirectory } from '../../helpers/get-app';
import App from '../../models/app';
import * as fs from 'fs-extra';
import path from 'path';

import logger from '../../helpers/logger';
import AppConfig from '../../../src/models/app-config'


export default async (request: Request, response: Response) => {
  logger.debug(
    `Handling incoming app creation request at ${request.originalUrl}.`
  );
  
  const appC = await saveAppToDatabase(request.body as AppConfig);

  const appk = appC.id;
  // console.log(appk)

  request.body.key = appk;
  // console.log(request.body.key)
  // console.log(request.body)
  generateAppConfigFile(request.body as IApp);
  await handleLogo(request, `./src/apps/${appk}/assets`)

  await addAppDirectory(appk);
  App.updateApps(appk);


  response.status(200).send({
    success: true,
    message: 'App created successfully.',
    key: appk
  });
};

async function saveAppToDatabase(input: AppConfig): Promise<AppConfig> {
  if (typeof input.supportsConnections === 'string'){
    input.supportsConnections = input.supportsConnections === 'true';
  }
  // console.log(input)
  const appConfig = await AppConfig.query().insert(input);

  return appConfig;
}
async function handleLogo(req: Request, appDirectory: string) {
  const logoFile = req.file;

  try {
    await fs.ensureDir(appDirectory);
  } catch (err) {
    console.error('Error creating assets directory:', err);
    return;
  }

  const faviconPath = path.join(appDirectory, 'favicon.svg');

  if (logoFile) {
    try {
      await fs.writeFile(faviconPath, logoFile.buffer);
      logger.info('Logo saved as favicon.svg:', faviconPath);
    } catch (err) {
      logger.error(err);
    }
  } else {
    const defaultLogoPath = '/workspace/packages/docs/pages/public/example-app/cat.svg'; 
    try {
      await fs.copyFile(defaultLogoPath, faviconPath);
      logger.info('Default logo added as favicon.svg:', faviconPath);
    } catch (err) {
      logger.error(err);
    }
  }
}

function generateAppConfigFile(config: IApp): void {
  const content = `
import defineApp from '../../helpers/define-app';

const appConfig = {
  name: ${JSON.stringify(config.name || '')},
  key: ${JSON.stringify(config.key || '')},
  iconUrl: ${JSON.stringify(
    config.iconUrl || `{BASE_URL}/apps/${config.key}/assets/favicon.svg`
  )},
  authDocUrl: ${JSON.stringify(
    config.authDocUrl ||
    `https://automatisch.io/docs/apps/${config.key}/connection`
  )},
  supportsConnections: ${config.supportsConnections || false},
  baseUrl: ${JSON.stringify(config.baseUrl || '')},
  apiBaseUrl: ${JSON.stringify(config.apiBaseUrl || '')},
  primaryColor: ${JSON.stringify(config.primaryColor || '000000')},
};

export default defineApp(appConfig);
  `;

  const directoryPath = `./src/apps/${config.key}`;
  const filePath = `${directoryPath}/index.ts`;
  const dtsFilePath = `${directoryPath}/index.d.ts`;

  fs.ensureDirSync(directoryPath);
  fs.writeFileSync(filePath, content, 'utf-8');
  fs.writeFileSync(dtsFilePath, '', 'utf-8');

  logger.info(`App config file generated at ${filePath}.`);
}
