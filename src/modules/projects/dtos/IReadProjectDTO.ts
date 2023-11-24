import IPaginationDTO from '@shared/dtos/IPaginationDTO';

export default interface IReadProjectDTO extends IPaginationDTO {
  name?: string;
}
