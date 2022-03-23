import { Account } from "../entities/Account";
import { IAccount } from "../entities/IAccount";
import { IAccountsRepository } from "./IAccountsRepository";

class AccountsRepository implements IAccountsRepository {
  accounts: IAccount[] = [];
  async create({ id, type, balance }: IAccount): Promise<IAccount> {
    const account = new Account();

    Object.assign(account, {
      id,
      type,
      balance,
    });

    this.accounts.push(account);

    console.log(this.accounts);

    return account;
  }
}

export { AccountsRepository };
