export type InputUpdateProductDTO = {
  name?: string;
  code?: string;
  cost?: number;
  price?: number;
  promotionalPrice?: number | null;
  category?: string;
}