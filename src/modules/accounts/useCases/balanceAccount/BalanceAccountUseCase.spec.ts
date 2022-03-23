import "reflect-metadata";

import { AccountsRepository } from "@modules/accounts/repositories/AccountsRepository";
import { IAccountsRepository } from "@modules/accounts/repositories/IAccountsRepository";
import { BalanceAccountUseCase } from "./BalanceAccountUseCase";
import { EventAccountUseCase } from "../eventAccount/EventAccountUseCase";
import { EventError } from "@shared/errors/EventError";

let accountsRepository: IAccountsRepository;
let eventAccountUseCase: EventAccountUseCase;
let balanceAccountUseCase: BalanceAccountUseCase;

describe("Event Account", () => {
  beforeEach(() => {
    accountsRepository = new AccountsRepository();
    eventAccountUseCase = new EventAccountUseCase(accountsRepository);
    balanceAccountUseCase = new BalanceAccountUseCase(accountsRepository);
  });

  it("should not be able to get balance from non-existing account", async () => {
    expect(async () => {
      const query = {
        account_id: "1234",
      };

      await balanceAccountUseCase.execute(query);
    }).rejects.toBeInstanceOf(EventError);
  });

  it("should be able to get balance from account", async () => {
    const request = {
      type: "deposit",
      destination: "100",
      amount: 20,
      origin: "",
    };
    await eventAccountUseCase.execute(request);

    const query = {
      account_id: "100",
    };

    const result = await balanceAccountUseCase.execute(query);

    expect(result).toBe(20);
  });
});
