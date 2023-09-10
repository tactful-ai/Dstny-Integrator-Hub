import { Response } from 'express';
import { IRequest } from '@automatisch/types';
import fs from 'fs-extra';
import appendImportToFile from './add-import';
import appendModuleToExport from './add-export';
import { addAppDirectory } from '../../helpers/get-app';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateActionFile(actionConfig: any): string {
  const { name, key, description, args, run } = actionConfig;

  const actionFileContent = `
import { IJSONObject } from '@automatisch/types';
import defineActions from '../../../../helpers/define-action';

export default defineActions({
  name: '${name}',
  key: '${key}',
  description: '${description}',
  arguments: ${JSON.stringify(args, null, 2)},

  async run($) {
    ${run}
  },
});
`;

  return actionFileContent;
}

async function generateMainIndexFile(appKey: string) {
  try {
    const actionDirectories = await fs.readdir(`./src/apps/${appKey}/actions`, {
      withFileTypes: true,
    });

    const validActionDirectories = actionDirectories
      .filter((dir) => dir.isDirectory())
      .map((dir) => dir.name);

    const importStatements = validActionDirectories
      .map((dir) => `import ${dir} from './${dir}';`)
      .join('\n');

    const exportStatement = `export default [${validActionDirectories.join(
      ', '
    )}];`;

    return `${importStatements}\n\n${exportStatement}`;
  } catch (error) {
    console.error('Error generating main action index file:', error);
    return '';
  }
}

export default async (request: IRequest, res: Response) => {
  const appKey = request.params.appkey;

  try {
    const actionConfig = request.body;

    const actionsDirectoryPath = `./src/apps/${appKey}/actions`;
    if (!fs.existsSync(actionsDirectoryPath)) {
      await fs.ensureDir(actionsDirectoryPath);
      const newImport = `import actions from './actions';`;
      await appendImportToFile(`./src/apps/${appKey}/index.ts`, newImport);
      await appendModuleToExport(`./src/apps/${appKey}/index.ts`, 'actions');
    }

    const actionFileContent = generateActionFile(actionConfig);

    await fs.ensureDir(`./src/apps/${appKey}/actions`);
    const actionsDir = `./src/apps/${appKey}/actions/${actionConfig.key}`;
    await fs.ensureDir(actionsDir);
    await fs.writeFile(`${actionsDir}/index.ts`, actionFileContent, 'utf-8');

    const mainIndexFileContent = await generateMainIndexFile(appKey);

    await fs.writeFile(
      `./src/apps/${appKey}/actions/index.ts`,
      mainIndexFileContent,
      'utf-8'
    );

    await addAppDirectory(request.body.key);

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error creating/updating action for app ${appKey}: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};
