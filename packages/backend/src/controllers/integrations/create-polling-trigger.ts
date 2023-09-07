import { Response } from 'express';
import { IRequest } from '@automatisch/types';
import fs from 'fs-extra';
import appendImportToFile from './add-import';
import appendModuleToExport from './add-export';
import { addAppDirectory } from '../../helpers/get-app';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateTriggerFile(triggerConfig: any): string {
  const { name, key, pollInterval, description, run } = triggerConfig;

  const triggerFileContent = `
import { IJSONObject } from '@automatisch/types';
import defineTrigger from '../../../../helpers/define-trigger';

export default defineTrigger({
  name: '${name}',
  key: '${key}',
  pollInterval: ${pollInterval},
  description: '${description}',

  async run($) {
    ${run}
  },
});
`;

  return triggerFileContent;
}

async function generateMainIndexFile(appKey: string) {
  try {
    const triggerDirectories = await fs.readdir(
      `./src/apps/${appKey}/triggers`,
      { withFileTypes: true }
    );

    const validTriggerDirectories = triggerDirectories
      .filter((dir) => dir.isDirectory())
      .map((dir) => dir.name);

    const importStatements = validTriggerDirectories
      .map((dir) => `import ${dir} from './${dir}';`)
      .join('\n');

    const exportStatement = `export default [${validTriggerDirectories.join(
      ', '
    )}];`;

    return `${importStatements}\n\n${exportStatement}`;
  } catch (error) {
    console.error('Error generating main trigger index file:', error);
    return '';
  }
}

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

    await fs.ensureDir(`./src/apps/${appKey}/triggers`);
    const triggerDir = `./src/apps/${appKey}/triggers/${triggerConfig.key}`;
    await fs.ensureDir(triggerDir);
    await fs.writeFile(`${triggerDir}/index.ts`, triggerFileContent, 'utf-8');

    const mainIndexFileContent = await generateMainIndexFile(appKey);

    await fs.writeFile(
      `./src/apps/${appKey}/triggers/index.ts`,
      mainIndexFileContent,
      'utf-8'
    );

    await addAppDirectory(request.body.key);

    res.sendStatus(200);
  } catch (error) {
    console.error(
      `Error creating/updating triggers for app ${appKey}: ${error}`
    );
    res.status(500).send('Internal Server Error');
  }
};
