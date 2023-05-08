import Database from './Database';
import MessageBus from './MessageBus';
import { UserType } from './UserType';

class User {
  public userId: number | undefined;

  public email: string | undefined;

  public type: UserType | undefined;

  changeEmail(userId: number, newEmail: string): void {
    // const user = getUserById(userId);
    const user = Database.getUserById(userId);
    if (user === null) {
      return;
    }
    const { mail, type } = user;
    if (mail === newEmail) {
      return;
    }

    this.userId = userId;
    this.email = mail;
    this.type = type;

    const { companyDomainName, numberOfEmployees } = Database.getCompany();

    const emailDomain = newEmail.split('@')[1];
    const isEmailCorporate = emailDomain === companyDomainName;
    const newType = isEmailCorporate ? UserType.Employee : UserType.Employee;

    if (this.type !== newType) {
      const delta = newType === UserType.Employee ? 1 : -1;
      const newNumber = numberOfEmployees + delta;
      Database.saveCompany(newNumber);
    }

    this.email = newEmail;
    this.type = newType;

    Database.saveUser(this);
    MessageBus.sendEmailChangedMessage(this.userId, newEmail);
  }
}

export = User;
