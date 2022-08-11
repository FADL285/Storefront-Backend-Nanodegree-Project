import { OrderModel } from '../order.model'
import { UserModel } from '../user.model'
import { IUser } from '../../interfaces/user.interface'
import db from '../../database'
import { IOrder, OrderStatus } from '../../interfaces/order.interface'

describe('Order Model -- CRUD Operations', function () {
  describe('CRUD Methods Definitions', function () {
    it('index method should be exist --> to Fetch All Orders', function () {
      expect(OrderModel.index).toBeDefined()
    })
    it('show method should be exist --> to Fetch Order by ID', function () {
      expect(OrderModel.show).toBeDefined()
    })
    it('create method should be exist --> to Create a Order', function () {
      expect(OrderModel.create).toBeDefined()
    })
    it('edit method should be exist --> to Edit a Order', function () {
      expect(OrderModel.edit).toBeDefined()
    })
    it('getOrdersByStatus method should be exist', function () {
      expect(OrderModel.getOrdersByStatus).toBeDefined()
    })
    it('getUserOrders method should be exist', function () {
      expect(OrderModel.getUserOrders).toBeDefined()
    })
    it('getUserOrdersByStatus method should be exist', function () {
      expect(OrderModel.getUserOrdersByStatus).toBeDefined()
    })
  })
  describe('Order Model -- CRUD Operations', function () {
    let userId: string
    let orderId: string

    beforeAll(async () => {
      const user = await UserModel.create({
        email: 'user@example.com',
        username: 'username123',
        firstname: 'firstname',
        lastname: 'lastname',
        password: 'password123'
      } as IUser)
      userId = user.id as string
    })
    afterAll(async () => {
      //    1. Open Connection with databas
      const conn = await db.connect()
      //  2. Run Delete Queries
      const ordersQuery = `DELETE
                                 FROM orders
                                 WHERE true`
      await conn.query(ordersQuery)
      const usersQuery = `DELETE
                                FROM users
                                WHERE true`
      await conn.query(usersQuery)
    })
    it('create method should create user and return it', async function () {
      const order = await OrderModel.create({
        userId,
        status: OrderStatus.ACTIVE
      })
      orderId = order.id as string
      expect(order.status).toBe(OrderStatus.ACTIVE)
    })
    it('index method should return array of all orders on db', async function () {
      const orders = await OrderModel.index()
      expect(orders.length).toBe(1)
    })
    it('show method should return order if id is exist', async function () {
      const order: IOrder = await OrderModel.show(orderId)
      expect(order).not.toBeUndefined()
      expect(order.status).toBe(OrderStatus.ACTIVE)
    })
    it('show method should rejected if order not exist or not valid uuid', async function () {
      const order = OrderModel.show('not-valid-id')
      await expectAsync(order).toBeRejected()
    })
    it('getOrdersByStatus method should return array of all completed orders in db', async function () {
      const orders = await OrderModel.getOrdersByStatus(OrderStatus.COMPLETED)
      expect(orders.length).toBe(0)
    })
    it('getUserOrders method should return all user orders', async function () {
      const orders = await OrderModel.getUserOrders(userId)
      expect(orders.length).toBe(1)
    })
    it('edit method should change order status to completed', async function () {
      const order = await OrderModel.edit({
        id: orderId,
        status: OrderStatus.COMPLETED
      })
      expect(order.status).toBe(OrderStatus.COMPLETED)
    })
    it('getUserOrdersByStatus method should return user completed orders', async function () {
      const orders = await OrderModel.getUserOrdersByStatus(
        userId,
        OrderStatus.COMPLETED
      )
      expect(orders.length).toBe(1)
    })
  })
})
