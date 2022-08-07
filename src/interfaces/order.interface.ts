import { IOrderProducts } from './order-products'

enum OrderStatus {
  ACTIVE,
  COMPLETED,
  CANCELED
}

export interface IOrder {
  id?: string
  status: OrderStatus
  userId: string
  products?: IOrderProducts[]
}
