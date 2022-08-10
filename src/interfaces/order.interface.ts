import { IOrderProducts } from './order-products'

export enum OrderStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}

export interface IOrder {
  id?: string
  status: OrderStatus
  userId: string
  products?: IOrderProducts[]
}
