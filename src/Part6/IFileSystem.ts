// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IFileSystem {
  getFiles(directoryName: string): string[];
  writeAllText(filePath: string, content: string): void;
  readAllLines(filePath: string): string[];
}

export = IFileSystem;
