import CompanyFactory from './CompanyFactory';
import EventDispatcher from './Event/EventDispatcher';
import UserFactory from './UserFactory';

import type Database from './Database';
import type IDomainLogger from './IDomainLogger';
import type IMessageBus from './IMessageBus';

class UserController {
  private readonly eventDispatcher: EventDispatcher;

  constructor(
    private readonly database: Database,
    messageBus: IMessageBus,
    domainLogger: IDomainLogger,
  ) {
    this.eventDispatcher = new EventDispatcher(messageBus, domainLogger);
  }

  changeEmail(userId: number, newEmail: string): string {
    const data = this.database.getUserById(userId);
    if (data === null) {
      return 'NG';
    }

    const user = UserFactory.create(data);

    const companyData = this.database.getCompany();
    const company = CompanyFactory.create(companyData);

    user.changeEmail(newEmail, company);

    this.database.saveCompany(company);

    this.database.saveUser(user);
    this.eventDispatcher.dispatchEvents(user.domainEvents);

    return 'OK';
  }
}

export = UserController;
