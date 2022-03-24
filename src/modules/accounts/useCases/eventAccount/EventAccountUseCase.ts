import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { EventError } from "@shared/errors/EventError";
import { IAccount, IRequestAccount } from "../../entities/IAccount";
import { IAccountsRepository } from "../../repositories/IAccountsRepository";
import { CreateAccountUseCase } from "../createAccount/CreateAccountUseCase";
import { ICreateAccountUseCase } from "../createAccount/ICreateAccountUseCase";
import { Account } from "@modules/accounts/entities/Account";
import { IDepositAccountUseCase } from "../depositAccount/IDepositAccountUseCase";
import { DepositAccountUseCase } from "../depositAccount/DepositAccountUseCase";
import { IWithdrawAccountUseCase } from "../withdrawAccount/IWithdrawAccountUseCase";
import { WithdrawAccountUseCase } from "../withdrawAccount/WithdrawAccountUseCase";
import { ITransferAccountUseCase } from "../transferAccount/ITransferAccountUseCase";
import { TransferAccountUseCase } from "../transferAccount/TransferAccountUseCase";

@injectable()
class EventAccountUseCase {
  private createAccountUseCase: ICreateAccountUseCase;
  private depositAccountUseCase: IDepositAccountUseCase;
  private withdrawAccountUseCase: IWithdrawAccountUseCase;
  private transferAccountUseCase: ITransferAccountUseCase;

  constructor(
    @inject("AccountsRepository")
    private accountsRepository: IAccountsRepository
  ) {
    this.createAccountUseCase = new CreateAccountUseCase();
    this.depositAccountUseCase = new DepositAccountUseCase();
    this.withdrawAccountUseCase = new WithdrawAccountUseCase();
    this.transferAccountUseCase = new TransferAccountUseCase();
  }

  async execute({
    type,
    destination,
    amount,
    origin,
  }: IRequestAccount): Promise<any> {
    if (amount < 0) {
      throw new AppError("A negative balance", 400);
    }
    const accountAlreadyExists = await this.accountsRepository.findyByAccount(
      destination
    );
    let payload: any = null;

    if (type === "deposit") {
      if (!accountAlreadyExists) {
        const account: IAccount = await this.createAccountUseCase.execute({
          destination,
          amount,
        });

        const changedAccount = await this.accountsRepository.create(account);

        payload = {
          destination: {
            id: changedAccount.id,
            balance: changedAccount.balance,
          },
        };
      } else {
        const account = new Account();
        account.id = accountAlreadyExists.id;
        account.balance = accountAlreadyExists.balance;

        const changedAccount = await this.depositAccountUseCase.execute({
          account,
          amount,
        });

        const result = await this.accountsRepository.deposit(changedAccount);
        payload = {
          destination: {
            id: result.id,
            balance: result.balance,
          },
        };
      }
    } else if (type === "withdraw") {
      const accountOriginAlreadyExists =
        await this.accountsRepository.findyByAccount(origin);
      if (!accountOriginAlreadyExists) {
        throw new EventError(0, 404);
      } else {
        const account = new Account();
        account.id = accountOriginAlreadyExists.id;
        account.balance = accountOriginAlreadyExists.balance;

        const changedAccount = await this.withdrawAccountUseCase.execute({
          account,
          amount,
        });

        const result = await this.accountsRepository.withdraw(changedAccount);

        payload = {
          origin: {
            id: result.id,
            balance: result.balance,
          },
        };
      }
    } else if (type === "transfer") {
      let changedAccount;
      const accountOriginAlreadyExists =
        await this.accountsRepository.findyByAccount(origin);
      if (!accountAlreadyExists) {
        const account: IAccount = await this.createAccountUseCase.execute({
          destination,
          amount: 0,
        });

        changedAccount = await this.accountsRepository.create(account);
      }
      if (!accountOriginAlreadyExists) {
        throw new EventError(0, 404);
      } else {
        const accountOrigin = new Account();
        accountOrigin.id = accountOriginAlreadyExists.id;
        accountOrigin.balance = accountOriginAlreadyExists.balance;

        const accountDestination = new Account();
        accountDestination.id = changedAccount.id;
        accountDestination.balance = changedAccount.balance;

        const accounts = await this.transferAccountUseCase.execute({
          accountOrigin,
          accountDestination,
          amount,
        });

        await this.accountsRepository.transfer(accounts[0], accounts[1]);

        payload = {
          origin: {
            id: accountOrigin.id,
            balance: accountOrigin.balance,
          },
          destination: {
            id: accountDestination.id,
            balance: accountDestination.balance,
          },
        };
      }
    }
    await this.accountsRepository.list();
    return payload;
  }
}

export { EventAccountUseCase };
