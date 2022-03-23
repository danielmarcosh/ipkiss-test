import {
  IAccount,
  IRequestWithdrawAccount,
} from "@modules/accounts/entities/IAccount";

interface IWithdrawAccountUseCase {
  execute({ account, amount }: IRequestWithdrawAccount): Promise<IAccount>;
}

export { IWithdrawAccountUseCase };
