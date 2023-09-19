/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs-extra';

export async function generateMainIndexFile(appKey: string) {
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

  console.log(args)
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
  const argsJsCode = JSON.stringify(args, null, 2);

  const triggerFileContent = `
import { IJSONObject } from '@automatisch/types';
import defineTrigger from '../../../../helpers/define-trigger';

export default defineTrigger({
  name: '${name}',
  key: '${key}',
  type: 'webhook',
  description: '${description}',
  arguments: 
${argsJsCode},

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
