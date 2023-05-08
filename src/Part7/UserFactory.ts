import Precondition from './Precondition';
import User from './User';
import { UserType } from './UserType';

class UserFactory {
  static create(data: object): User {
    Precondition.requires(Object.keys(data).length >= 3);
    const getUserType = (type: number): UserType => {
      if (type === UserType.Customer) {
        return UserType.Customer;
      }
      if (type === UserType.Employee) {
        return UserType.Employee;
      }
      throw new Error();
    };

    const id = Number(Object.values(data)[0]);
    const email = String(Object.values(data)[1]);
    const type = getUserType(Number(Object.values(data)[2]));

    return new User(id, email, type);
  }
}

export = UserFactory;
