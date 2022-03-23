import {
  IAccount,
  IRequestTransferAccount,
} from "@modules/accounts/entities/IAccount";
import { ITransferAccountUseCase } from "./ITransferAccountUseCase";

class TransferAccountUseCase implements ITransferAccountUseCase {
  async execute({
    accountOrigin,
    accountDestination,
    amount,
  }: IRequestTransferAccount): Promise<IAccount[]> {
    const accounts: IAccount[] = [];
    accountOrigin.balance -= amount;
    accountDestination.balance += amount;

    accounts.push(accountOrigin);
    accounts.push(accountDestination);

    return accounts;
  }
}

export { TransferAccountUseCase };
