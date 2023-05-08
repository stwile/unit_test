class MessageBus {
  static sendEmailChangedMessage(userId: number, email: string): void {
    console.table({ userId, email });
  }
}

export = MessageBus;
