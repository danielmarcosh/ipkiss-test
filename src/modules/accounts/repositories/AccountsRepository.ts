import { Account } from "../entities/Account";
import { IAccount } from "../entities/IAccount";
import { IAccountsRepository } from "./IAccountsRepository";

class AccountsRepository implements IAccountsRepository {
  accounts: IAccount[] = [];
  async create(account: IAccount): Promise<IAccount> {
    this.accounts.push(account);

    console.log(this.accounts);

    return account;
  }
  async findyByAccount(id: string): Promise<IAccount> {
    return this.accounts.find((account) => account.id === id);
  }
  deposit(data: IAccount): Promise<IAccount> {
    throw new Error("Method not implemented.");
  }
}

export { AccountsRepository };
