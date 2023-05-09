import CompanyFactory from './CompanyFactory';
import Database from './Database';
import MessageBus from './MessageBus';
import UserFactory from './UserFactory';

class UserController {
  constructor(
    private readonly database = new Database(),
    private readonly messageBus = new MessageBus(),
  ) {}

  changeEmail(userId: number, newEmail: string): void {
    const data = this.database.getUserById(userId);
    if (data === null) {
      return;
    }

    const user = UserFactory.create(data);

    const companyData = this.database.getCompany();
    const company = CompanyFactory.create(companyData);

    user.changeEmail(newEmail, company);

    this.database.saveCompany(company);

    this.database.saveUser(user);
    this.messageBus.sendEmailChangedMessage(userId, newEmail);
  }
}

export = UserController;
