import Session from '@shared/infra/http/entities/Session';
import ICreateSessionDTO from '@modules/sessions/dtos/ICreateSessionDTO';

interface ISessionRepository {
  create(data: ICreateSessionDTO): Promise<Session>;
  findByRefreshToken(refreshToken: string): Promise<Session>;
  delete(id: string): Promise<void>;
}

export default ISessionRepository;
