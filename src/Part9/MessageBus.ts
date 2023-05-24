import type IBus from './IBus';

class MessageBus {
  constructor(private readonly bus: IBus) {}

  sendEmailChangedMessage(userId: number, newEmail: string): void {
    this.bus.send(
      `Type: User Email Changed; ID ${userId}; NewEmail ${newEmail}`,
    );
  }
}

export = MessageBus;
