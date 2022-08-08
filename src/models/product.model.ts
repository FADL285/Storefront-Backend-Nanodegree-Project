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
}
