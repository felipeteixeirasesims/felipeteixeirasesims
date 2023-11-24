import ISessionRepository from "./ISessionRepository";
import ICreateSessionDTO from "../dtos/ICreateSessionDTO";
import Session from "@shared/infra/http/entities/Session";
import { v4 as uuidv4 } from 'uuid';

class SessionsRepositoryInMemory implements ISessionRepository {
  
  sessions: Session[] = [];

  async create(data: ICreateSessionDTO): Promise<Session> {
    const session: Session = {
      id: uuidv4(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.sessions.push(session);

    return { ...session };
  }

  findByRefreshToken(refreshToken: string): Promise<Session> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    this.sessions = this.sessions.filter(session => session.id !== id);
  }
}

export default SessionsRepositoryInMemory;



