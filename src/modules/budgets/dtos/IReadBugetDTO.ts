import IPaginationDTO from '@shared/dtos/IPaginationDTO';

export default interface IReadBugetDTO extends IPaginationDTO {
  amount?: number;
}
