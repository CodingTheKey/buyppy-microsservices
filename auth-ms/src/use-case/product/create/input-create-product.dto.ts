export type InputCreateProductDTO = {
  id: number;
  name: string;
  code: string;
  coast: number;
  price: number;
  promotionalPrice: number | null;
  category: string;
}