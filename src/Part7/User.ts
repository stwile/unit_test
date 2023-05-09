import { UserType } from './UserType';

import type Company from './Company';

class User {
  constructor(
    private userId: number,

    private email: string,

    private type: UserType,
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

      return;
    }

    this.email = newEmail;
    this.type = newType;
  }
}

export = User;
