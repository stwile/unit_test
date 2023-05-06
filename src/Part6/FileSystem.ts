import { readFileSync, readdirSync, writeFileSync } from 'fs';

import type IFileSystem from './IFileSystem';

class FileSystem implements IFileSystem {
  getFiles(directoryName: string): string[] {
    return readdirSync(directoryName);
  }

  writeAllText(filePath: string, content: string): void {
    writeFileSync(filePath, content);
  }

  readAllLines(filePath: string): string[] {
    return readFileSync(filePath).toString().split('\n');
  }
}

export = FileSystem;
