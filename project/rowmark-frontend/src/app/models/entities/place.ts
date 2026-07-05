export interface Place {
  placeKey: number;
  name: string;
  typePlace: string;
  place_PlaceKey?: number | null;
  placeOfPlace?: Place[] | null;
}
