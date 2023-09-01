import { Response } from 'express';
import { IRequest } from '@automatisch/types';
import type { IApp } from '@automatisch/types';
import { addAppDirectory } from '../../helpers/get-app';
import App from '../../models/app';
import * as fs from 'fs-extra';

import logger from '../../helpers/logger';

export default async (request: IRequest, response: Response) => {
  logger.debug(
    `Handling incoming app creation request at ${request.originalUrl}.`
  );
  generateAppConfigFile(request.body as IApp);

  await addAppDirectory(request.body.key);
  App.updateApps(request.body.key);

  response.status(200).send({
    success: true,
    message: 'App created successfully.',
  });
};

function generateAppConfigFile(config: IApp): void {
  const content = `
import defineApp from '../../helpers/define-app';

const appConfig = {
  name: ${JSON.stringify(config.name || '')},
  key: ${JSON.stringify(config.key || '')},
  iconUrl: ${JSON.stringify(
    config.iconUrl || `{BASE_URL}/apps/dstny-engage/assets/favicon.svg`
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

  fs.ensureDirSync(directoryPath);
  fs.writeFileSync(filePath, content, 'utf-8');

  logger.debug(`App config file generated at ${filePath}.`);
}
