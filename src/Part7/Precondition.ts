class Precondition {
  static requires(precondition: boolean, message = '') {
    if (precondition === false) {
      throw new Error(message);
    }
  }
}

export = Precondition;
