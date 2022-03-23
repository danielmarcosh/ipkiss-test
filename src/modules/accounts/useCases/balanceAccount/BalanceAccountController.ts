import { container } from "tsyringe";
import { Request, Response } from "express";
import { BalanceAccountUseCase } from "./BalanceAccountUseCase";

class BalanceAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.query;

    const balanceAccountUseCase = container.resolve(BalanceAccountUseCase);

    const payload = await balanceAccountUseCase.execute({
      account_id,
    });

    return response.status(200).json(payload);
  }
}

export { BalanceAccountController };
