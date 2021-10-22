import { Request, Response } from 'express';
import { GetLab3MessageService } from '../services/GetLab3MessagesService';

export class GetLab3MessageController {
  async handle(request: Request, response: Response) {
    const service = new GetLab3MessageService();
    const result = await service.execute();

    return response.json(result);
  }
}