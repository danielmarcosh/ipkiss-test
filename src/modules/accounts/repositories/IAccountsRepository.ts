import { IAccount } from "../entities/IAccount";

interface IAccountsRepository {
  create(data: IAccount): Promise<IAccount>;
}

export { IAccountsRepository };
