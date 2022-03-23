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
  async execute({
    type,
    destination,
    amount,
    origin,
  }: IRequestAccount): Promise<any> {
    console.log({ type, destination, amount, origin });
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
    let payload: any = null;

    if (type === "deposit") {
      if (!accountAlreadyExists) {
        account.balance = amount;
        const result = await this.accountsRepository.create(account);
        payload = {
          destination: {
            id: result.id,
            balance: result.balance,
          },
        };
      } else {
        accountAlreadyExists.balance += amount;
        const result = await this.accountsRepository.deposit(
          accountAlreadyExists
        );
        payload = {
          destination: {
            id: result.id,
            balance: result.balance,
          },
        };
      }
    } else if (type === "withdraw") {
      if (!accountAlreadyExists) {
        throw new EventError(0, 404);
      } else {
        accountAlreadyExists.balance -= amount;
        const result = await this.accountsRepository.withdraw(
          accountAlreadyExists
        );
        payload = {
          origin: {
            id: result.id,
            balance: result.balance,
          },
        };
      }
    } else if (type === "transfer") {
      const accountOriginAlreadyExists =
        await this.accountsRepository.findyByAccount(origin);
      if (!accountAlreadyExists || !accountOriginAlreadyExists) {
        throw new EventError(0, 404);
      } else {
        console.log(accountOriginAlreadyExists);
        console.log(accountAlreadyExists);
        accountOriginAlreadyExists.balance -= amount;
        accountAlreadyExists.balance += amount;
        await this.accountsRepository.transfer(
          accountOriginAlreadyExists,
          accountAlreadyExists
        );
        payload = {
          origin: {
            id: accountOriginAlreadyExists.id,
            balance: accountOriginAlreadyExists.balance,
          },
          destination: {
            id: accountAlreadyExists.id,
            balance: accountAlreadyExists.balance,
          },
        };
      }
    }
    return payload;
  }
}

export { EventAccountUseCase };
