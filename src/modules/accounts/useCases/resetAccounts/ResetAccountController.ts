import { container } from "tsyringe";
import { Response, Request } from "express";
import { ResetAccountUseCase } from "./ResetAccountUseCase";

class ResetAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const resetAccountUseCase = container.resolve(ResetAccountUseCase);

    await resetAccountUseCase.execute();

    return response.status(200).send("OK");
  }
}

export { ResetAccountController };
