import {
  IAccount,
  IRequestCreateAccount,
} from "@modules/accounts/entities/IAccount";

interface ICreateAccountUseCase {
  execute({ destination, amount }: IRequestCreateAccount): Promise<IAccount>;
}

export { ICreateAccountUseCase };
