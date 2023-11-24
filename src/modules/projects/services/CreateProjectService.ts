import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Logger from '@config/logger';
import ReadinessLevel from '@shared/infra/http/enuns/ReadinessLevel';
import Project from '@shared/infra/http/entities/Project';
import IProjectRepository from '../repositories/IProjectRepository';

interface IRequestDTO {
  name: string;
  description: string;
  readinessLevel: ReadinessLevel;
  users: { id: string; hoursAllocated: number }[];
}

@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectRepository
  ) {}

  public async execute({ name, description, readinessLevel, users }: IRequestDTO): Promise<Project> {
    const codeError = 'Invalid_registration'
    const messageError = 'Project name already exists';
    
    const checkProjectExists = await this.projectsRepository.findByName(name);

    if (checkProjectExists) {
      Logger.error(messageError);
      throw new AppError(codeError, messageError);
    }

    const project = await this.projectsRepository.create({
      name,
      description,
      readinessLevel,
      users
    });

    Logger.warn(
      `INSERT INTO project (name) values ${project.name}}`
    );

    return project;
  }
}

export default CreateProjectService;
