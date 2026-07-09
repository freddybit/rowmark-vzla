export interface ReadProfileDTO {
  profileKey: number; // La Primary Key (SERIAL)
  id: number; // El documento de identidad (NUMERIC)
  firstName: string;
  secondName: string;
  firstLastname: string;
  secondLastname: string;
  place_PlaceKey: number;
  email: string;
  roles: any[]; // Lo dejamos así asumiendo que sigues cruzando roles
}
