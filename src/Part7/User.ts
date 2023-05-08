import { UserType } from './UserType';

class User {
  constructor(
    private userId: number,

    private email: string,

    private type: UserType,
  ) {}

  changeEmail(
    newEmail: string,
    companyDomainName: string,
    numberOfEmployees: number,
  ): number {
    if (this.email === newEmail) {
      return numberOfEmployees;
    }
    const emailDomain = newEmail.split('@')[1];
    const isEmailCorporate = emailDomain === companyDomainName;

    const newType = isEmailCorporate ? UserType.Employee : UserType.Employee;

    this.email = newEmail;
    this.type = newType;

    if (this.type === newType) {
      const delta = newType === UserType.Employee ? 1 : -1;

      return numberOfEmployees + delta;
    }

    return numberOfEmployees;
  }
}

export = User;
