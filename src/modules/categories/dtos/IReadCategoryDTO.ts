import IPaginationDTO from '@shared/dtos/IPaginationDTO';

export default interface IReadCategoryDTO extends IPaginationDTO {
  amount?: number;
}
