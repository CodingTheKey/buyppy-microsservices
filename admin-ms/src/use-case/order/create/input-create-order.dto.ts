export type InputCreateOrderDTO = {
  clientId: string,
  status: string,
  items:  Array<{
    productId: string,
    quantity: number,
    price: number,
    createdAt: string,
  }>,
  total: number,
  canceledAt: string | null,
  cancelReason: string | null,
  refundedAt: string | null,
  refundReason: string | null,
  createdAt: string,
  updatedAt: string | null,
  deletedAt: string | null
}