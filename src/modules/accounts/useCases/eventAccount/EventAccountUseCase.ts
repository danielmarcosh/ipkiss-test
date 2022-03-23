import { AppError } from "@shared/errors/AppError";
import { EventError } from "@shared/errors/EventError";
import { inject, injectable } from "tsyringe";
import { Account } from "../../entities/Account";
import { IRequestAccount } from "../../entities/IAccount";
import { IAccountsRepository } from "../../repositories/IAccountsRepository";

@injectable()
class EventAccountUseCase {
  constructor(
    @inject("AccountsRepository")
    private accountsRepository: IAccountsRepository
  ) {}
  async execute({ type, destination, amount }: IRequestAccount): Promise<any> {
    console.log({ type, destination, amount });
    if (amount < 0) {
      throw new AppError("A negative balance", 400);
    }
    if (!destination) {
      throw new AppError("Destination is empty or null", 400);
    }
    const accountAlreadyExists = await this.accountsRepository.findyByAccount(
      destination
    );
    const account = new Account();
    account.id = destination;
    let payload: Account = null;

    if (type === "deposit") {
      if (!accountAlreadyExists) {
        account.balance = amount;
        payload = await this.accountsRepository.create(account);
      } else {
        accountAlreadyExists.balance += amount;
        payload = await this.accountsRepository.deposit(accountAlreadyExists);
      }
    } else if (type === "withdraw") {
      if (!accountAlreadyExists) {
        throw new EventError(0, 400);
      } else {
        accountAlreadyExists.balance -= amount;
        payload = await this.accountsRepository.withdraw(accountAlreadyExists);
      }
    }
    return {
      destination: {
        id: payload.id,
        balance: payload.balance,
      },
    };
  }
}

export { EventAccountUseCase };
