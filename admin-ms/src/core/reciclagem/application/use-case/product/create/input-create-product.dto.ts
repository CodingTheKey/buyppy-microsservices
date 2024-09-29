export type InputCreateProductDTO = {
  name: string;
  code: string;
  cost: number;
  price: number;
  promotionalPrice: number | null;
  categoryId: string;
}
