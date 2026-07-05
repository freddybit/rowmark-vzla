export interface ProductCard {
  imgName: string;
  imgAlt: string;
  name: string;
  description: string;
  unitsAvailable: number;
  material: Array<string>;
  finish: Array<string>;
  capabilities: Array<string>;
  attributes: Array<string>;
  sizes: Array<string>;
  engravingDepths: Array<number>;
  prices: Array<Array<number>>;
  colors?: Array<string>;
}
