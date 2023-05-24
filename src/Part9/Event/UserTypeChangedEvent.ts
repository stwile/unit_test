import type IDomainEvent from './IDomainEvent';
import type { UserType } from '../UserType';

class UserTypeChangedEvent implements IDomainEvent {
  constructor(
    public readonly userId: number,
    public readonly oldType: UserType,
    public readonly newType: UserType,
  ) {}

  public equals(other: UserTypeChangedEvent): boolean {
    return (
      this.userId === other.userId &&
      this.oldType === other.oldType &&
      this.newType === other.newType
    );
  }
}

export = UserTypeChangedEvent;
