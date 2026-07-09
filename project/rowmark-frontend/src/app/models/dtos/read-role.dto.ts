import { ReadPermissionDTO } from "./read-permission.dto";

export interface ReadRoleDTO {
  roleKey: number;
  name: string;
  description: string;
  permissions: ReadPermissionDTO[];
}
