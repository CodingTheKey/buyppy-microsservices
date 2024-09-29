export type InputUpdateProductDTO = {
  name?: string;
  code?: string;
  cost?: number;
  price?: number;
  promotionalPrice?: number | null;
  category: {
    id: string
  };
  attributes: Attribute[]
}

export type Attribute = {
  id: string,
  key: string,
  value: string,
  stockQuantity: number,
  stockId: string | null,
  attributeId: string,
}