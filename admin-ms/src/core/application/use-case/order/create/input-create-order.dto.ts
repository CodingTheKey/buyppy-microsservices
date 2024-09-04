export type InputCreateOrderDTO = {
  clientId: string,
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