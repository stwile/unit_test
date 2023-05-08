import { UserType } from './UserType';

import type User from './User';

type UserEntity = {
  id: number;
  mail: string;
  type: UserType;
};

type CompanyEntity = {
  companyDomainName: string;
  numberOfEmployees: number;
};

class Database {
  getUserById = (id: number): UserEntity | null => {
    const data: UserEntity[] = [
      { id: 999999, mail: 'hoge@example.com', type: UserType.Employee },
    ];

    const result = data.find((item) => item.id === id);
    if (result === undefined) {
      return null;
    }

    return result;
  };

  getCompany = (): CompanyEntity => ({
    companyDomainName: 'example',
    numberOfEmployees: 3,
  });

  saveCompany = (newNumber: number): void => {
    console.log(newNumber);
  };

  saveUser = (user: User): void => {
    console.log(user);
  };
}

export = Database;
