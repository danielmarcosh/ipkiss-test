import {
  IAccount,
  IRequestDepositAccount,
} from "@modules/accounts/entities/IAccount";

interface IDepositAccountUseCase {
  execute({ account, amount }: IRequestDepositAccount): Promise<IAccount>;
}

export { IDepositAccountUseCase };
