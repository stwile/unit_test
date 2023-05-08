import Precondition from './Precondition';

class Company {
  constructor(private domainName: string, private numberOfEmployees: number) {}

  changeNumberOfEmployees(delta: number): void {
    Precondition.requires(this.numberOfEmployees + delta >= 0);
    this.numberOfEmployees += delta;
  }

  isEmailCorporate(email: string): boolean {
    const emailDomain = email.split('@')[1];

    return emailDomain === this.domainName;
  }
}

export = Company;
