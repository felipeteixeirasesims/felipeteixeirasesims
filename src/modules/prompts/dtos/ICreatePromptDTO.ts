import OutputType from '@shared/infra/http/enuns/OutputType';

export default interface ICreatePromptDTO {
  title: string;
  description: string;
  prompt: string;
  outputType: OutputType;
  creatorId: string;
  categoryId: string;
}
