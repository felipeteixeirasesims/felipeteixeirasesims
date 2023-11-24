import IReadRoleDTO from "@modules/roles/dtos/IReadRoleDTO";
import { PaginatedResponse } from "@shared/infra/http/PaginatedResponse";
import Role from "@shared/infra/http/entities/Role";

export default interface IRoleRepository {
  all(data: IReadRoleDTO): Promise<PaginatedResponse<Role[]>>;
}
