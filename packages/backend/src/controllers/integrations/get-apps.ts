import * as fs from 'fs-extra';

export default async function getExistingAppKeys(): Promise<string[]> {
  try {
    const appDirectories = await fs.readdir('./src/apps', {
      withFileTypes: true,
    });
    const appKeys = appDirectories
      .filter((dir) => dir.isDirectory())
      .map((dir) => dir.name);
    return appKeys;
  } catch (error) {
    console.error('Error reading app directories:', error);
    return [];
  }
}
