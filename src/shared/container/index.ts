import { container } from "tsyringe";
import { AccountsRepository } from "@modules/accounts/repositories/AccountsRepository";
import { IAccountsRepository } from "@modules/accounts/repositories/IAccountsRepository";

container.registerSingleton<IAccountsRepository>(
  "AccountsRepository",
  AccountsRepository
);
