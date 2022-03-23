import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

class CreateAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type, destination, amount } = request.body;
    const createAccountUseCase = container.resolve(CreateAccountUseCase);

    const payload = await createAccountUseCase.execute({
      type,
      destination,
      amount,
    });

    return response.status(201).json(payload);
  }
}

export { CreateAccountController };
