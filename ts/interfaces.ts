export interface iProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: Array<{ src: string }>;
  permalink: string;
}