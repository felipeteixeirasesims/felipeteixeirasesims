import IOrdinationDTO from '@shared/dtos/IOrdinationDTO';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';

export default interface IReadUserDTO extends IPaginationDTO, IOrdinationDTO {
  firstName?: string;
}
