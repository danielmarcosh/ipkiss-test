import { inject, injectable } from "tsyringe";
import { EventError } from "@shared/errors/EventError";
import { IAccountsRepository } from "../../repositories/IAccountsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class BalanceAccountUseCase {
  constructor(
    @inject("AccountsRepository")
    private accountsRepository: IAccountsRepository
  ) {}

  async execute({ account_id }: any): Promise<any> {
    if (!account_id) {
      throw new AppError("Isn't not null", 400);
    }
    const accountAlreadyExists = await this.accountsRepository.findyByAccount(
      account_id
    );
    if (!accountAlreadyExists) {
      throw new EventError(0, 404);
    }
    let payload = accountAlreadyExists.balance;

    return payload;
  }
}

export { BalanceAccountUseCase };
