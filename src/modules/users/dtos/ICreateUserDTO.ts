export default interface ICreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  phones: string[];
  roleId: string;
  supervisorId?: string;

}
