import fs from 'fs/promises';

export default async function appendImportToFile(
  filePath: string,
  newImport: string
) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.split('\n');

    let lastImportIndex = -1;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim().startsWith('import ')) {
        lastImportIndex = i;
        break;
      }
    }

    if (lastImportIndex !== -1) {
      lines.splice(lastImportIndex + 1, 0, newImport);
    }

    // Write the updated content back to the file
    await fs.writeFile(filePath, lines.join('\n'), 'utf-8');

    console.log('New import added successfully.');
  } catch (error) {
    console.error('Error adding new import:', error);
  }
}
