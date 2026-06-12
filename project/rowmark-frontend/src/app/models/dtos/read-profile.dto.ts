import { ReadRoleDTO } from "./read-role.dto";

export interface ReadProfileDTO {
  profileKey: number;
  id: number;
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  roles: ReadRoleDTO[];
}
