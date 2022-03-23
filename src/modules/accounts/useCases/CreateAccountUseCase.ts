import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Account } from "../entities/Account";
import { IAccount, IRequestAccount } from "../entities/IAccount";
import { IAccountsRepository } from "../repositories/IAccountsRepository";

@injectable()
class CreateAccountUseCase {
  constructor(
    @inject("AccountsRepository")
    private accountsRepository: IAccountsRepository
  ) {}
  async execute({ type, destination, amount }: IRequestAccount): Promise<any> {
    if (amount < 0) {
      throw new AppError("A negative balance", 400);
    }
    if (!destination) {
      throw new AppError("Destination isn't already exists", 400);
    }

    const account = new Account();
    account.balance += amount;
    account.id = destination;
    account.type = type;

    await this.accountsRepository.create(account);

    return {
      destination: {
        id: account.id,
        balance: account.balance,
      },
    };
  }
}

export { CreateAccountUseCase };
