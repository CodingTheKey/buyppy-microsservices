export type InputCreateOrderDTO = {
  clientId: string | null,
  productAttributeId: string,
  status: string,
  discountPercent: number | null,
  paymentMethod: string | null,
  items:  Array<{
    productId: string,
    quantity: number,
    price: number,
    createdAt: string,
    productAttributeId: string
  }>,
  total: number,
}