// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IMessageBus {
  sendEmailChangedMessage(userId: number, newEmail: string): void;
}

export = IMessageBus;
