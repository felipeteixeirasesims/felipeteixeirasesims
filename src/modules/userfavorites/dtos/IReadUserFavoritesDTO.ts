import IPaginationDTO from '@shared/dtos/IPaginationDTO';

export default interface IReadUserFavoritesDTO extends IPaginationDTO {
  amount?: number;
}
