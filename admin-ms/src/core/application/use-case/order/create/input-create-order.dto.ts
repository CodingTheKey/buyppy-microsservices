export type InputCreateOrderDTO = {
  clientId: string | null,
  productAttributeId: string,
  status: string,
  items:  Array<{
    productId: string,
    quantity: number,
    price: number,
    createdAt: string,
    productAttributeId: string
  }>,
  total: number,
}