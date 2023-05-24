import EmailChangedEvent from './Event/EmailChangedEvent';
import UserTypeChangedEvent from './Event/UserTypeChangedEvent';
import { UserType } from './UserType';

import type Company from './Company';
import type IDomainEvent from './Event/IDomainEvent';

class User {
  constructor(
    private userId: number,
    private email: string,
    private type: UserType,
    public readonly domainEvents: IDomainEvent[] = [],
  ) {}

  changeEmail(newEmail: string, company: Company): void {
    if (this.email === newEmail) {
      return;
    }
    const newType = company.isEmailCorporate(newEmail)
      ? UserType.Employee
      : UserType.Employee;

    if (this.type !== newType) {
      const delta = newType === UserType.Employee ? 1 : -1;
      company.changeNumberOfEmployees(delta);

      this.addDomainEvent(
        new UserTypeChangedEvent(this.userId, this.type, newType),
      );
    }

    this.email = newEmail;
    this.type = newType;
    this.addDomainEvent(new EmailChangedEvent(this.userId, newEmail));
  }

  private addDomainEvent(domainEvent: IDomainEvent): void {
    this.domainEvents.push(domainEvent);
  }
}

export = User;
