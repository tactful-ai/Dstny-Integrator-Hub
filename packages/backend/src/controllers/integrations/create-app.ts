import { Response } from 'express';
import { IRequest } from '@automatisch/types';
import type { IApp } from '@automatisch/types';
import * as fs from 'fs-extra';

import logger from '../../helpers/logger';

export default async (request: IRequest, response: Response) => {
  logger.debug(
    `Handling incoming app creation request at ${request.originalUrl}.`
  );
  generateAppConfigFile(request.body as IApp);

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
  iconUrl: ${JSON.stringify(config.iconUrl || '')},
  authDocUrl: ${JSON.stringify(config.authDocUrl || '')},
  supportsConnections: ${config.supportsConnections || false},
  baseUrl: ${JSON.stringify(config.baseUrl || '')},
  apiBaseUrl: ${JSON.stringify(config.apiBaseUrl || '')},
  primaryColor: ${JSON.stringify(config.primaryColor || '')},
};

export default defineApp(appConfig);
  `;

  const directoryPath = `./src/apps/${config.key}`;
  const filePath = `${directoryPath}/index.ts`;

  fs.ensureDirSync(directoryPath);
  fs.writeFileSync(filePath, content, 'utf-8');

  logger.debug(`App config file generated at ${filePath}.`);
}
