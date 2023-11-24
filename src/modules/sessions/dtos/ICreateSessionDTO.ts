export default interface ICreateSessionDTO {
  expiresDate: Date;
  refreshToken: string;
  userId: string;
}
