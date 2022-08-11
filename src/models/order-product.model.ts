import db from '../database'
import { throwError } from '../utils'
import { IError } from '../interfaces/error.interface'
import { IOrder } from '../interfaces/order.interface'
import { IOrderProduct } from '../interfaces/order-product.interface'

export class OrderProductModel {
  static async index(orderId: string): Promise<IOrder> {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const mainQuery = `SELECT o.id, op.product_id, o.status, o.user_id, SUM(quantity) AS quantity
                               FROM order_products op
                                        JOIN orders o ON op.order_id = o.id AND o.id = $1
                               group by op.product_id, o.id`
      const { rows: result } = await client.query(mainQuery, [orderId])
      const order: IOrder = {
        id: result[0].id,
        status: result[0].status,
        userId: result[0].user_id
      }
      const productsData = result.reduce(
        (previousValue, currentValue) => {
          previousValue.ids.push(currentValue.product_id)
          previousValue.quantities[currentValue.product_id] =
            currentValue.quantity
          return previousValue
        },
        { ids: [], quantities: {} }
      )
      const productsQuery = `SELECT *
                                   FROM products
                                   WHERE id = ANY ($1)`
      const { rows: products } = await client.query(productsQuery, [
        productsData.ids
      ])
      order.products = products.map((product) => {
        product.quantity = parseInt(productsData.quantities[product.id])
        return product
      })
      //    3. Return the data
      return order
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

  static async show(orderProduct: Partial<IOrderProduct>): Promise<IOrder> {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const query = `SELECT order_id      AS id,
                                  o.user_id,
                                  o.status,
                                  product_id,
                                  p.name,
                                  p.category,
                                  p.price,
                                  SUM(quantity) AS quantity
                           FROM order_products op
                                    JOIN orders o on o.id = op.order_id
                                    JOIN products p on p.id = op.product_id AND op.product_id = $1 AND op.order_id = $2
                           GROUP BY order_id, product_id, o.user_id, o.status, p.name, p.category, p.price`
      const {
        rows: [result]
      } = await client.query(query, [
        orderProduct.productId,
        orderProduct.orderId
      ])

      return {
        id: result.id,
        status: result.status,
        userId: result.user_id,
        product: {
          id: result.product_id,
          name: result.name,
          category: result.category,
          price: result.price,
          quantity: parseInt(result.quantity)
        }
      }
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

  static async create(orderProduct: IOrderProduct): Promise<IOrder> {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const query = `INSERT INTO order_products (order_id, product_id, quantity)
                           VALUES ($1, $2, $3)`
      await client.query(query, [
        orderProduct.orderId,
        orderProduct.productId,
        orderProduct.quantity
      ])
      //    3. Return the data
      return await this.show({
        orderId: orderProduct.orderId,
        productId: orderProduct.productId
      })
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

  // Update Order Product Quantity
  static async edit(orderProduct: IOrderProduct): Promise<IOrder> {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const query = `UPDATE order_products
                           SET quantity = $1
                           WHERE id = (SELECT id FROM order_products WHERE order_id = $2 AND product_id = $3 LIMIT 1);`
      await client.query(query, [
        orderProduct.quantity,
        orderProduct.orderId,
        orderProduct.productId
      ])
      //    3. Return the data
      return await this.show({
        orderId: orderProduct.orderId,
        productId: orderProduct.productId
      })
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

  //  DELETE Order
  static async delete(orderProduct: Partial<IOrderProduct>): Promise<IOrder> {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const query = `DELETE
                           FROM order_products
                           WHERE order_id = $1
                             AND product_id = $2;`
      await client.query(query, [orderProduct.orderId, orderProduct.productId])
      //    3. Return the data
      return await this.index(orderProduct.orderId as string)
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
}
