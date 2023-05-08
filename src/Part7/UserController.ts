import Database from './Database';
import MessageBus from './MessageBus';
import User from './User';

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
    const { mail, type } = data;

    const user = new User(userId, mail, type);

    const { companyDomainName, numberOfEmployees } = this.database.getCompany();

    const newNumberOfEmployees = user.changeEmail(
      newEmail,
      companyDomainName,
      numberOfEmployees,
    );

    this.database.saveCompany(newNumberOfEmployees);

    this.database.saveUser(user);
    this.messageBus.sendEmailChangedMessage(userId, newEmail);
  }
}
