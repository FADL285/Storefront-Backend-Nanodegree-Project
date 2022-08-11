import db from '../database'
import { IOrder, OrderStatus } from '../interfaces/order.interface'
import { throwError } from '../utils'
import { IError } from '../interfaces/error.interface'

export class OrderModel {
  // GET ALL ORDERS
  static async index(): Promise<IOrder[]> {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const query = `SELECT *
                           FROM orders`
      const { rows: result } = await client.query(query)
      //    3. Return the data
      return result
    } catch (err) {
      return throwError({
        message: (err as IError).message,
        statusCode: (err as IError).statusCode,
        code: (err as IError).code,
        detail: (err as IError).detail
      })
    } finally {
      // 4. Close the connection
      client.release()
    }
  }

  // Show Specific Order
  static async show(id: string): Promise<IOrder> | never {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const query = `SELECT *
                           FROM orders
                           WHERE id = ($1)`
      const {
        rows: [result]
      } = await client.query(query, [id])
      if (!result)
        return throwError({ message: 'order not found', statusCode: 404 })
      //    3. Return the data
      return result
    } catch (err) {
      return throwError({
        message: (err as IError).message,
        statusCode: (err as IError).statusCode,
        code: (err as IError).code,
        detail: (err as IError).detail
      })
    } finally {
      //    4. Close the connection
      client.release()
    }
  }

  // CREATE NEW ORDER
  static async create(order: IOrder): Promise<IOrder> | never {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const query = `INSERT INTO orders (status, user_id)
                           VALUES ($1, $2)
                           RETURNING *`
      const {
        rows: [result]
      } = await client.query(query, [order.status, order.userId])
      //    3. Return the data
      return result
    } catch (err) {
      return throwError({
        message: (err as IError).message,
        statusCode: (err as IError).statusCode,
        code: (err as IError).code,
        detail: (err as IError).detail
      })
    } finally {
      //    4. Close the connection
      client.release()
    }
  }

  // UPDATE ORDER STATUS
  static async edit(order: Partial<IOrder>): Promise<IOrder> | never {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the queries
      const selectQuery = `SELECT id, status
                                 FROM orders
                                 WHERE id = ($1)`
      const {
        rows: [result]
      } = await client.query(selectQuery, [order.id])
      //    3. Return the data
      if (!result)
        throwError({
          message: `There is no product with id "${order.id}"`,
          statusCode: 404
        })

      const updateQuery = `UPDATE orders
                                 SET status=$1
                                 WHERE id = $2
                                 RETURNING *`
      const {
        rows: [updatedProduct]
      } = await client.query(updateQuery, [order.status, order.id])

      return updatedProduct
    } catch (err) {
      return throwError({
        message: (err as IError).message,
        statusCode: (err as IError).statusCode,
        code: (err as IError).code,
        detail: (err as IError).detail
      })
    } finally {
      //    4. Close the connection
      client.release()
    }
  }

  // GET USERS ORDERS
  static async getUserOrders(userId: string): Promise<IOrder[]> {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const query = `SELECT *
                           FROM orders WHERE user_id=$1`
      const { rows: result } = await client.query(query, [userId])
      //    3. Return the data
      return result
    } catch (err) {
      return throwError({
        message: (err as IError).message,
        statusCode: (err as IError).statusCode,
        code: (err as IError).code,
        detail: (err as IError).detail
      })
    } finally {
      // 4. Close the connection
      client.release()
    }
  }

  //  GET ALL ORDERS By STATUS
  static async getOrdersByStatus(status: OrderStatus): Promise<IOrder[]> {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const query = `SELECT *
                           FROM orders WHERE status = $1`
      const { rows: result } = await client.query(query, [status])
      //    3. Return the data
      return result
    } catch (err) {
      return throwError({
        message: (err as IError).message,
        statusCode: (err as IError).statusCode,
        code: (err as IError).code,
        detail: (err as IError).detail
      })
    } finally {
      // 4. Close the connection
      client.release()
    }
  }
  //  GET USER ORDERS BY STATUS
  static async getUserOrdersByStatus(
    userId: string,
    status: OrderStatus
  ): Promise<IOrder[]> {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const query = `SELECT *
                           FROM orders WHERE user_id = $1 AND status = $2`
      const { rows: result } = await client.query(query, [userId, status])
      //    3. Return the data
      return result
    } catch (err) {
      return throwError({
        message: (err as IError).message,
        statusCode: (err as IError).statusCode,
        code: (err as IError).code,
        detail: (err as IError).detail
      })
    } finally {
      // 4. Close the connection
      client.release()
    }
  }
}
