import { prismaClient } from '../prisma';

export class GetLab3MessageService {
  async execute() {
    const messages = await prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: "desc"
      },
      include: {
        user: true
      }
    });
    
    return messages;
  }
}