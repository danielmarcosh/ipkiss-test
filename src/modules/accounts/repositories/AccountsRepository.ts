import { Account } from "../entities/Account";
import { IAccount } from "../entities/IAccount";
import { IAccountsRepository } from "./IAccountsRepository";

class AccountsRepository implements IAccountsRepository {
  accounts: IAccount[] = [];
  async create(account: IAccount): Promise<IAccount> {
    this.accounts.push(account);
    return this.accounts[this.accounts.length - 1];
  }
  async findyByAccount(id: string): Promise<IAccount> {
    return this.accounts.find((account) => account.id === id);
  }
  async deposit(destination: IAccount): Promise<IAccount> {
    this.accounts.forEach((account) => {
      if (account.id === destination.id) {
        account.balance = destination.balance;
      }
    });
    return this.accounts.find((account) => account.id === destination.id);
  }
}

export { AccountsRepository };
