export type InputCreateProductDTO = {
  id: number;
  name: string;
  code: string;
  cost: number;
  price: number;
  promotionalPrice: number | null;
  category: string;
}