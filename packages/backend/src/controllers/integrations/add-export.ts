import fs from 'fs/promises';

export default async function appendModuleToExport(
  filePath: string,
  moduleName: string
) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.split('\n');

    let appConfigAssignmentIndex = -1;

    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].includes('const appConfig = {')) {
        appConfigAssignmentIndex = i;
        break;
      }
    }

    if (appConfigAssignmentIndex !== -1) {
      const appConfigLine = lines[appConfigAssignmentIndex];
      const moduleLine = `  ${moduleName},`;
      lines[appConfigAssignmentIndex] = `${appConfigLine}\n${moduleLine}`;
    }

    await fs.writeFile(filePath, lines.join('\n'), 'utf-8');

    console.log('Module added to export object successfully.');
  } catch (error) {
    console.error('Error adding module to export:', error);
  }
}
