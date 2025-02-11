/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs-extra';

export async function generateMainIndexFile(appKey: string) {
  try {
    const triggerDirectories = await fs.readdir(`./src/apps/${appKey}/triggers`, {
      withFileTypes: true,
    });

    const importStatements = triggerDirectories
      .filter((dir) => dir.isDirectory())
      .map((dir) => {
        // Convert directory name from kebab-case to camelCase
        const camelCaseName = dir.name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        return `import ${camelCaseName} from './${dir.name}';`;
      })
      .join('\n');

    const exportStatement = `export default [${triggerDirectories
      .filter((dir) => dir.isDirectory())
      .map((dir) => {
        // Convert directory name from kebab-case to camelCase for export
        return dir.name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      })
      .join(', ')}];`;

    return `${importStatements}\n\n${exportStatement}`;
  } catch (error) {
    console.error('Error generating main trigger index file:', error);
    return '';
  }
}


export function generateTriggerFile(triggerConfig: any): string {
const triggerType = triggerConfig.type;
  if (triggerType === 'polling') {
    return generatePollingTriggerFile(triggerConfig);
  } else if (triggerType === 'webhook') {
    return generateWebhookTriggerFile(triggerConfig);
  } else {
    throw new Error(`Unsupported trigger type: ${triggerType}`);
  }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generatePollingTriggerFile(triggerConfig: any): string {
  const { name, key, pollInterval, description, args, run } = triggerConfig;

  const triggerFileContent = `
import { IJSONObject } from '@automatisch/types';
import defineTrigger from '../../../../helpers/define-trigger';

export default defineTrigger({
  name: '${name}',
  key: '${key}',
  pollInterval: ${pollInterval},
  description: '${description}',
  arguments: ${JSON.stringify(args, null, 2)},

  async run($) {
    ${run}
  },
});
`;

  return triggerFileContent;
}


export function generateWebhookTriggerFile(triggerConfig: any): string {
  const { name, key, description, args, testRun, registerHook, unregisterHook } = triggerConfig;

  const triggerFileContent = `
import { IJSONObject } from '@automatisch/types';
import defineTrigger from '../../../../helpers/define-trigger';

export default defineTrigger({
  name: '${name}',
  key: '${key}',
  type: 'webhook',
  description: '${description}',
  arguments: 
${JSON.stringify(args, null, 2)},

  async testRun($) {
    ${testRun}
  },

  async registerHook($) {
    ${registerHook}
  },

  async unregisterHook($) {
    ${unregisterHook}
  },
});
`;

  return triggerFileContent;
}
