
export interface Product {
  id: number;
  imgUrl: string;
  imgAlt: string;
  name: string;
  description: string;
  material: string;
  finish: string;
  attributes: string;
  usage: string;
  capabilities: string;
  unitsAvailable: number;
  price: number;
  size: string;
  engravingDepth: number;
  urlVideos: Array<string>;
  iva: number;
  totalPrice: number;
}

