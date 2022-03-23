import {
  IAccount,
  IRequestWithdrawAccount,
} from "@modules/accounts/entities/IAccount";
import { IWithdrawAccountUseCase } from "./IWithdrawAccountUseCase";

class WithdrawAccountUseCase implements IWithdrawAccountUseCase {
  async execute({
    account,
    amount,
  }: IRequestWithdrawAccount): Promise<IAccount> {
    account.balance -= amount;
    return account;
  }
}

export { WithdrawAccountUseCase };
