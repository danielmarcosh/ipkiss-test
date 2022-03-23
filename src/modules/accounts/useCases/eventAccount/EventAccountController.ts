import { container } from "tsyringe";
import { Request, Response } from "express";
import { EventAccountUseCase } from "./EventAccountUseCase";

class EventAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type, destination, amount, origin } = request.body;
    const createAccountUseCase = container.resolve(EventAccountUseCase);

    const payload = await createAccountUseCase.execute({
      type,
      destination,
      amount,
      origin,
    });

    return response.status(201).json(payload);
  }
}

export { EventAccountController };
