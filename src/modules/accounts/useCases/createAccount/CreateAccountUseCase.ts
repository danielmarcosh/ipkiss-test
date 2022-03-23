import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Account } from "../../entities/Account";
import { IRequestAccount } from "../../entities/IAccount";
import { IAccountsRepository } from "../../repositories/IAccountsRepository";

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
      throw new AppError("Destination is empty or null", 400);
    }
    const accountAlreadyExists = await this.accountsRepository.findyByAccount(
      destination
    );
    if (accountAlreadyExists) {
      throw new AppError("Destiny does not exist", 400);
    }

    const account = new Account();
    account.id = destination;
    if (type === "deposit") {
      account.balance += amount;
    }

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
