import { readdirSync, writeFileSync, readFileSync } from 'fs';
import { basename, extname } from 'path';

type withIndexPath = {
  index: number;
  path: string;
};

class AuditManager {
  constructor(
    private readonly maxEntriesPerFile: number,
    private readonly directoryName: string,
  ) {}

  addRecord(visitorName: string, timeOfVisit: Date): void {
    const filePaths: string[] = readdirSync(this.directoryName);
    const sortByIndex = (files: string[]): withIndexPath[] => {
      const getIndex = (filePath: string): number => {
        // File name example: audit_1.txt
        const fileName: string = basename(filePath, extname(filePath));

        return Number.parseInt(fileName.split('_')[1], 10);
      };

      return files.map(
        (path: string): withIndexPath => ({
          index: getIndex(path),
          path,
        }),
      );
    };
    const sorted = sortByIndex(filePaths);

    const newRecord = `${visitorName};${timeOfVisit.toISOString()}`;

    if (sorted.length === 0) {
      const newFile = `${this.directoryName}audit_1.txt`;
      writeFileSync(newFile, newRecord);

      return;
    }

    const { index: currentFileIndex, path: currentFilePath } =
      sorted[sorted.length - 1];

    const currentFileFullPath = `${this.directoryName}${currentFilePath}`;
    const lines: string[] = readFileSync(currentFileFullPath)
      .toString()
      .split('\n');

    if (lines.length < this.maxEntriesPerFile) {
      const newLines = [...lines, newRecord];
      const newContent = newLines.map((line: string) => `${line}\r\n`).join('');
      writeFileSync(currentFileFullPath, newContent.toString());
    } else {
      const newIndex: number = currentFileIndex + 1;
      const newName = `audit_${newIndex}.txt`;
      const newFile = `${this.directoryName}${newName}`;
      writeFileSync(newFile, newRecord);
    }
  }
}

export = AuditManager;
