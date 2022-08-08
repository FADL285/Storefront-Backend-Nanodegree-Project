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
        product.category.toLowerCase()
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
  //    Edit Product
  static async edit(product: Partial<IProduct>): Promise<IProduct> | never {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the queries
      const selectQuery = `SELECT name, price, category FROM products WHERE id = ($1)`
      const {
        rows: [result]
      } = await client.query(selectQuery, [product.id])
      //    3. Return the data
      if (!result)
        throwError({
          message: `There is no product with id "${product.id}"`,
          statusCode: 404
        })
      const name = product.name ? product.name : result.name
      const price = product.price ? product.price : result.price
      const category = product.category ? product.category : result.category

      const updateQuery = `UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING *`
      const {
        rows: [updatedProduct]
      } = await client.query(updateQuery, [
        name,
        price,
        category.toLowerCase(),
        product.id
      ])

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
  //    Delete Product
  static async delete(id: string): Promise<IProduct> | never {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the queries
      const selectQuery = `SELECT COUNT(*) FROM products WHERE id = ($1)`
      const {
        rows: [{ count: result }]
      } = await client.query(selectQuery, [id])
      if (parseInt(result) === 0)
        throwError({
          message: `There is no product with id "${id}"`,
          statusCode: 404
        })

      const deleteQuery = `DELETE FROM products WHERE id = ($1) RETURNING *`
      const {
        rows: [product]
      } = await client.query(deleteQuery, [id])
      //    3. Return the data
      return product
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
  //  Get Products By Category
  static async getProductsByCategory(category: string): Promise<IProduct[]> {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const query = `SELECT * FROM products WHERE category = ($1)`
      const { rows: result } = await client.query(query, [
        category.toLowerCase()
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
      // 4. Close the connection
      client.release()
    }
  }
}
