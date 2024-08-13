export type InputCreateOrderDTO = {
  id: string,
  clientId: string,
  status: string,
  items: [
    {
      id: string,
      productId: string,
      quantity: number,
      price: number,
      createdAt: string,
    },
    {
      id: string,
      productId: string,
      quantity: number,
      price: number,
      createdAt: string,
    }
  ],
  total: number,
  canceledAt: string | null,
  cancelReason: string | null,
  refundedAt: string | null,
  refundReason: string | null,
  createdAt: string,
  updatedAt: string | null,
  deletedAt: string | null
}