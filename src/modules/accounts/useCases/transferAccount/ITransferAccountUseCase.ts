import {
  IAccount,
  IRequestTransferAccount,
} from "@modules/accounts/entities/IAccount";

interface ITransferAccountUseCase {
  execute({
    accountOrigin,
    accountDestination,
    amount,
  }: IRequestTransferAccount): Promise<IAccount[]>;
}

export { ITransferAccountUseCase };
