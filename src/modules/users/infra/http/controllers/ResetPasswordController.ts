import { container } from 'tsyringe';

import { Request, Response } from 'express';

import { ResetPasswordService } from '@modules/users/services/ResetPasswordService';

export class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { token, password } = request.body;

      const resetPasswordService = container.resolve(ResetPasswordService);

      await resetPasswordService.execute(token, password);

      return response.status(204).json();
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}
