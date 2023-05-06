class FileUpdate {
  constructor(
    public readonly fileName: string,
    public readonly newContent: string,
  ) {}
}

export = FileUpdate;
