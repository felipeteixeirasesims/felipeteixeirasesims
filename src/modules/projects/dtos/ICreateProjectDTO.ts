import ReadinessLevel from "@shared/infra/http/enuns/ReadinessLevel";

export default interface ICreateProjectDTO {
  name: string;
  description: string;
  readinessLevel: ReadinessLevel;
  users: { id: string; hoursAllocated: number }[];
}
