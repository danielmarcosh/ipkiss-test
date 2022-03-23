import "reflect-metadata";

import { AccountsRepository } from "@modules/accounts/repositories/AccountsRepository";
import { IAccountsRepository } from "@modules/accounts/repositories/IAccountsRepository";
import { EventAccountUseCase } from "./EventAccountUseCase";
import { EventError } from "@shared/errors/EventError";

let accountsRepository: IAccountsRepository;
let eventAccountUseCase: EventAccountUseCase;

describe("Event Account", () => {
  beforeEach(() => {
    accountsRepository = new AccountsRepository();
    eventAccountUseCase = new EventAccountUseCase(accountsRepository);
  });

  it("should  be able to create an account", async () => {
    const request = {
      type: "deposit",
      destination: "100",
      amount: 10,
      origin: "",
    };
    const result = await eventAccountUseCase.execute(request);

    expect(result).toStrictEqual({ destination: { id: "100", balance: 10 } });
  });

  it("should  be able to deposit an account", async () => {
    const request1 = {
      type: "deposit",
      destination: "100",
      amount: 10,
      origin: "",
    };
    await eventAccountUseCase.execute(request1);

    const request2 = {
      type: "deposit",
      destination: "100",
      amount: 10,
      origin: "",
    };
    const result2 = await eventAccountUseCase.execute(request2);

    expect(result2).toStrictEqual({ destination: { id: "100", balance: 20 } });
  });

  it("should not be able to withdraw from non-existing account", async () => {
    expect(async () => {
      const request = {
        type: "withdraw",
        destination: "200",
        amount: 10,
        origin: "",
      };
      await eventAccountUseCase.execute(request);
    }).rejects.toBeInstanceOf(EventError);
  });

  it("should be able to withdraw from an existing account", async () => {
    const request1 = {
      type: "deposit",
      destination: "100",
      amount: 20,
      origin: "",
    };

    await eventAccountUseCase.execute(request1);
    const request2 = {
      type: "withdraw",
      destination: "",
      amount: 5,
      origin: "100",
    };
    const result = await eventAccountUseCase.execute(request2);

    expect(result).toStrictEqual({ origin: { id: "100", balance: 15 } });
  });

  it("should be able to transfer from an existing account", async () => {
    const origin = {
      type: "deposit",
      destination: "100",
      amount: 15,
      origin: "",
    };
    await eventAccountUseCase.execute(origin);

    const destination = {
      type: "deposit",
      destination: "300",
      amount: 0,
      origin: "",
    };
    await eventAccountUseCase.execute(destination);

    const transfer = {
      type: "transfer",
      origin: "100",
      amount: 15,
      destination: "300",
    };

    const result = await eventAccountUseCase.execute(transfer);

    expect(result).toStrictEqual({
      origin: { id: "100", balance: 0 },
      destination: { id: "300", balance: 15 },
    });
  });

  it("should not be able to transfer from non-existing account", async () => {
    expect(async () => {
      const transfer = {
        type: "transfer",
        origin: "200",
        amount: 15,
        destination: "300",
      };
      await eventAccountUseCase.execute(transfer);
    }).rejects.toBeInstanceOf(EventError);
  });
});
