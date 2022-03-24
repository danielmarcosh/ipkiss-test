import { IAccount } from "../entities/IAccount";

interface IAccountsRepository {
  create(data: IAccount): Promise<IAccount>;
  findyByAccount(id: string): Promise<IAccount>;
  deposit(data: IAccount): Promise<IAccount>;
  withdraw(data: IAccount): Promise<IAccount>;
  transfer(origin: IAccount, destination: IAccount): Promise<void>;
  reset(): Promise<void>;
  list(): Promise<void>;
}

export { IAccountsRepository };
