import { readFileSync, readdirSync, writeFileSync } from 'fs';

import FileContent from './FileContent';

import type FileUpdate from './FileUpdate';

class Persister {
  readDirectory(directoryName: string): FileContent[] {
    return readdirSync(directoryName).map((fileName: string) => {
      const filePath = `${directoryName}${fileName}`;
      const lines = readFileSync(filePath).toString().split('\n');

      return new FileContent(fileName, lines);
    });
  }

  applyUpdate(directoryName: string, update: FileUpdate): void {
    const filePath = `${directoryName}${update.fileName}`;
    writeFileSync(filePath, update.newContent);
  }
}

export = Persister;
