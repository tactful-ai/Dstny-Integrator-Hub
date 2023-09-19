import { Response } from 'express';
import { IRequest } from '@automatisch/types';
import fs from 'fs-extra';
import appendImportToFile from './add-import';
import appendModuleToExport from './add-export';
import { addAppDirectory } from '../../helpers/get-app';
import {generateMainIndexFile, generateTriggerFile} from './trigger-utils'

export default async (request: IRequest, res: Response) => {
  const appKey = request.params.appkey;

  try {
    const triggerConfig = request.body;

    const triggersDirectoryPath = `./src/apps/${appKey}/triggers`;
    if (!fs.existsSync(triggersDirectoryPath)) {
      await fs.ensureDir(triggersDirectoryPath);
      const newImport = `import triggers from './triggers';`;
      await appendImportToFile(`./src/apps/${appKey}/index.ts`, newImport);
      await appendModuleToExport(`./src/apps/${appKey}/index.ts`, 'triggers');
    }

    const triggerFileContent = generateTriggerFile(triggerConfig);

    const triggerDir = `./src/apps/${appKey}/triggers/${triggerConfig.key}`;
    await fs.ensureDir(triggerDir);
    await fs.writeFile(`${triggerDir}/index.ts`, triggerFileContent, 'utf-8');

    const mainIndexFileContent = await generateMainIndexFile(appKey);

    await fs.writeFile(
      `./src/apps/${appKey}/triggers/index.ts`,
      mainIndexFileContent,
      'utf-8'
    );

    await addAppDirectory(appKey);

    res.sendStatus(200);
  } catch (error) {
    console.error(
      `Error creating/updating trigger for app ${appKey}: ${error}`
    );
    res.status(500).send('Internal Server Error');
  }
};
