
export interface Product {
  id: number;
  imgUrl: string;
  imgAlt: string;
  name: string;
  description: string;
  material: Array<string>;
  finish: Array<string>;
  attributes: Array<string>;
  capabilities: Array<string>;
  unitsAvailable: number;
  price: number;
  size: string;
  engravingDepth: number;
  videoUrl: string;
  iva: number;
  totalPrice: number;
}

