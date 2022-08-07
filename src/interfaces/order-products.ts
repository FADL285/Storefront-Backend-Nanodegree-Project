import { IProduct } from './product.interface'

export interface IOrderProducts {
  id?: string
  quantity: number
  orderId: string
  productId: string
  products?: IProduct[]
}
