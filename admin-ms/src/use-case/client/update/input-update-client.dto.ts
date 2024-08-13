export type InputUpdateClientDTO = {
  id: string,
  document: string,
  phone: string,
  email: string,
  name: string,
  observations: string,
  address: {
    id: string,
    number: number,
    street: string,
    zipCode: string
  }
}