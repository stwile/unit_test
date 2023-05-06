class FileContent {
  constructor(
    public readonly fileName: string,
    public readonly lines: string[],
  ) {}
}

export = FileContent;
