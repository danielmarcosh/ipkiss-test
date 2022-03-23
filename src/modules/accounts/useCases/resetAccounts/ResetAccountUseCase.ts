import { inject, injectable } from "tsyringe";
import { IAccountsRepository } from "../../repositories/IAccountsRepository";

@injectable()
class ResetAccountUseCase {
  constructor(
    @inject("AccountsRepository")
    private accountsRepository: IAccountsRepository
  ) {}

  async execute(): Promise<void> {
    await this.accountsRepository.reset();
  }
}

export { ResetAccountUseCase };
