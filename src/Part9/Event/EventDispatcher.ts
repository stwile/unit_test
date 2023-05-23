import EmailChangedEvent from './EmailChangedEvent';
import UserTypeChangedEvent from './UserTypeChangedEvent';

import type IDomainEvent from './IDomainEvent';
import type IDomainLogger from '../IDomainLogger';
import type IMessageBus from '../IMessageBus';

class EventDispatcher {
  constructor(
    private readonly messageBus: IMessageBus,
    private readonly domainLogger: IDomainLogger,
  ) {}

  dispatchEvents(events: IDomainEvent[]): void {
    events.forEach((e) => this.dispatch(e));
  }

  dispatch(event: IDomainEvent): void {
    if (event instanceof EmailChangedEvent) {
      this.messageBus.sendEmailChangedMessage(event.userId, event.newEmail);
    }
    if (event instanceof UserTypeChangedEvent) {
      this.domainLogger.userTypeHasChanged(
        event.userId,
        event.oldType,
        event.newType,
      );
    }
  }
}

export = EventDispatcher;
