import { Account } from "@modules/accounts/entities/Account";
import { IAccount, IRequestCreateAccount } from "../../entities/IAccount";
import { ICreateAccountUseCase } from "./ICreateAccountUseCase";

class CreateAccountUseCase implements ICreateAccountUseCase {
  async execute({
    destination,
    amount,
  }: IRequestCreateAccount): Promise<IAccount> {
    const account = new Account();
    account.id = destination;
    account.balance = amount;

    return account;
  }
}

export { CreateAccountUseCase };
