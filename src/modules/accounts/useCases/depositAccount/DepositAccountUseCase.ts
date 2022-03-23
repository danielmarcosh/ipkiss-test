import { IAccount, IRequestDepositAccount } from "../../entities/IAccount";

class DepositAccountUseCase {
  async execute({
    account,
    amount,
  }: IRequestDepositAccount): Promise<IAccount> {
    account.balance += amount;
    return account;
  }
}

export { DepositAccountUseCase };
