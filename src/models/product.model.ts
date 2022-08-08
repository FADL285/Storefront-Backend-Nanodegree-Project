import db from '../database'
import { IProduct } from '../interfaces/product.interface'
import { throwError } from '../utils'
import { IError } from '../interfaces/error.interface'

export class ProductModel {
  //    Get All Products
  static async index(): Promise<IProduct[]> {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const query = `SELECT * FROM products`
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
  //    Get One Product
  static async show(id: string): Promise<IProduct> | never {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const query = `SELECT * FROM products WHERE id = ($1)`
      const {
        rows: [result]
      } = await client.query(query, [id])
      if (!result)
        return throwError({ message: 'product not found', statusCode: 404 })
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
  //    Create Product
  static async create(product: IProduct): Promise<IProduct> | never {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const query = `INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *`
      const {
        rows: [result]
      } = await client.query(query, [
        product.name,
        product.price,
        product.category
      ])
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
}
