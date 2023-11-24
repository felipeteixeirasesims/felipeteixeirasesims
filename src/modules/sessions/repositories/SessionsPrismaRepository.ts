import ISessionRepository from './ISessionRepository';
import ICreateSessionDTO from '../dtos/ICreateSessionDTO';
import { PrismaClient } from '@prisma/client';
import Session from '@shared/infra/http/entities/Session';

class SessionsRepository implements ISessionRepository {

  private prismaClient = new PrismaClient();

  public async create(data: ICreateSessionDTO): Promise<Session> {  
    const token = await this.prismaClient.session.create({
      data: {
        ...data,
      }
    });
    return token;
  }


  public async findByRefreshToken(refreshToken: string): Promise<Session> {
    const token = await this.prismaClient.session.findUnique({
      where: {
        refreshToken
      }
    });
    return token;
  }

  public async delete(id: string): Promise<void> {
    await this.prismaClient.session.delete({
      where: {
        id
      }
    });
  }
}

export default SessionsRepository;
