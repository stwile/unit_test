import type IDomainEvent from './IDomainEvent';

class EmailChangedEvent implements IDomainEvent {
  constructor(
    public readonly userId: number,
    public readonly newEmail: string,
  ) {}

  public equals(other: EmailChangedEvent): boolean {
    return this.userId === other.userId && this.newEmail === other.newEmail;
  }
}

export = EmailChangedEvent;
