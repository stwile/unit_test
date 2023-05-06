import AuditManager from './AuditManager';
import Persister from './Persister';

class ApplicationService {
  private readonly auditManager: AuditManager;

  constructor(
    private readonly directoryName: string,
    private readonly maxEntriesPerFile: number,
    private readonly persister: Persister = new Persister(),
  ) {
    this.auditManager = new AuditManager(this.maxEntriesPerFile);
  }

  addRecord(visitorName: string, timeOfVisit: Date): void {
    const files = this.persister.readDirectory(this.directoryName);
    const update = this.auditManager.addRecord(files, visitorName, timeOfVisit);
    this.persister.applyUpdate(this.directoryName, update);
  }
}

export = ApplicationService;
