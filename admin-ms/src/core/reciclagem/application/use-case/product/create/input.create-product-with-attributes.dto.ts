export type InputCreateProductWithAttributesDTO = {
  name: string;
  code: string;
  cost: number;
  price: number;
  promotionalPrice: number | null;
  category: {
    id: string
    title: string
  };
  attributes: Array<{
    id: string
    value: "azul",
    stockQuantity: 10
  }>;
}
