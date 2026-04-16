
export interface ProductCard {
  imgName: string;
  imgAlt: string;
  name: string;
  description: string;
  unitsAvailable: number;
  material: string;
  finish: string;
  usability: string;
  capabilities: string;
  sizes: Array<string>;
  engravingDepths: Array<number>;
  prices: Array<Array<number>>;
  colors?: Array<string>;
}
