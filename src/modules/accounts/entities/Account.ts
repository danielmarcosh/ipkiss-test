import { IAccount } from "./IAccount";

class Account implements IAccount {
  id?: string;
  balance?: number;

  constructor() {
    this.balance = 0.0;
  }
}

export { Account };
