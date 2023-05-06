import {
  unlinkSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmdirSync,
  readFileSync,
} from 'fs';
import { join } from 'path';

import ApplicationService from './ApplicationService';

describe('AuditManager', () => {
  const maxEntriesPerFile = 3;
  const directoryName = './test-data/';
  const sut = new ApplicationService(directoryName, maxEntriesPerFile);

  beforeAll(() => {
    // 事前にディレクトリを作成
    if (!existsSync(directoryName)) {
      mkdirSync(directoryName);
    }
  });

  beforeEach(() => {
    // ファイルを削除しておく
    if (existsSync(directoryName)) {
      const files = readdirSync(directoryName);
      files.forEach((file) => {
        unlinkSync(join(directoryName, file));
      });
    }
  });

  afterAll(() => {
    if (existsSync(directoryName)) {
      // テスト後にディレクトリを削除
      const files = readdirSync(directoryName);
      files.forEach((file) => {
        unlinkSync(join(directoryName, file));
      });

      rmdirSync(directoryName);
    }
  });

  afterEach(() => {
    // テストデータ用のファイルを削除
    try {
      unlinkSync(`${directoryName}audit_1.txt`);
      unlinkSync(`${directoryName}audit_2.txt`);
    } catch (e) {
      // ファイルが存在しない場合は無視する
    }
  });

  describe('addRecord', () => {
    test('ファイルが存在しない場合、新しいファイルが作成される', () => {
      const visitorName = 'test-user';
      const timeOfVisit = new Date('2023-05-06T10:00:00');
      sut.addRecord(visitorName, timeOfVisit);

      const expectedFilePath = `${directoryName}audit_1.txt`;
      const expectedContent = `${visitorName};${timeOfVisit.toISOString()}`;

      expect(existsSync(expectedFilePath)).toBe(true);
      expect(readFileSync(expectedFilePath).toString()).toBe(expectedContent);
    });

    test('ファイルに空きがある場合、ファイルに追記される', () => {
      const visitorName1 = 'test-user-1';
      const timeOfVisit1 = new Date('2023-05-06T10:00:00');
      const visitorName2 = 'test-user-2';
      const timeOfVisit2 = new Date('2023-05-06T10:01:00');
      const visitorName3 = 'test-user-3';
      const timeOfVisit3 = new Date('2023-05-06T10:02:00');
      sut.addRecord(visitorName1, timeOfVisit1);
      sut.addRecord(visitorName2, timeOfVisit2);
      sut.addRecord(visitorName3, timeOfVisit3);

      const expectedFilePath = `${directoryName}audit_1.txt`;
      const expectedContent =
        `${visitorName1};${timeOfVisit1.toISOString()}\r\n` +
        `${visitorName2};${timeOfVisit2.toISOString()}\r\n`;
      expect(existsSync(expectedFilePath)).toBe(true);
      expect(readFileSync(expectedFilePath).toString()).toBe(expectedContent);
    });
  });
});
