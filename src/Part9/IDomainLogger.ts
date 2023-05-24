import type { UserType } from './UserType';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IDomainLogger {
  userTypeHasChanged(
    userId: number,
    oldType: UserType,
    newType: UserType,
  ): void;
}

export = IDomainLogger;
