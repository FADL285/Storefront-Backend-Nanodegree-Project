import { IProduct } from './product.interface'

export interface IOrderProduct {
  id?: string
  quantity: number
  orderId: string
  productId: string
  userId?: string
  product?: IProduct
}
