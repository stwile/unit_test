import { basename, extname } from 'path';

import FileUpdate from './FileUpdate';

import type FileContent from './FileContent';

type withIndexFile = {
  index: number;
  file: FileContent;
};

class AuditManager {
  constructor(private readonly maxEntriesPerFile: number) {}

  addRecord(
    files: FileContent[],
    visitorName: string,
    timeOfVisit: Date,
  ): FileUpdate {
    const sortByIndex = (items: FileContent[]): withIndexFile[] => {
      const getIndex = (item: FileContent): number => {
        // File name example: audit_1.txt
        const fileName: string = basename(
          item.fileName,
          extname(item.fileName),
        );

        return Number.parseInt(fileName.split('_')[1], 10);
      };

      return items.map(
        (file): withIndexFile => ({
          index: getIndex(file),
          file,
        }),
      );
    };
    const sorted = sortByIndex(files);

    const newRecord = `${visitorName};${timeOfVisit.toISOString()}`;

    if (sorted.length === 0) {
      return new FileUpdate(`audit_1.txt`, newRecord);
    }

    const { index: currentFileIndex, file: currentFile } =
      sorted[sorted.length - 1];

    if (currentFile.lines.length < this.maxEntriesPerFile) {
      const newLines = [...currentFile.lines, newRecord];
      const newContent = newLines.map((line: string) => `${line}\r\n`).join('');

      return new FileUpdate(currentFile.fileName, newContent);
    }
    const newIndex: number = currentFileIndex + 1;
    const newName = `audit_${newIndex}.txt`;

    return new FileUpdate(newName, newRecord);
  }
}

export = AuditManager;
