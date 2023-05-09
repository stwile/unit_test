import Company from './Company';
import Precondition from './Precondition';

class CompanyFactory {
  static create(data: object): Company {
    Precondition.requires(Object.keys(data).length >= 2);

    const domainName = String(Object.values(data)[0]);
    const numberOfEmployees = Number(Object.values(data)[1]);

    return new Company(domainName, numberOfEmployees);
  }
}

export = CompanyFactory;
