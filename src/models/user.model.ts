import db from '../database'
import { IUser } from '../interfaces/user.interface'
import { throwError, hashPassword, validatePassword } from '../utils'
import { IError } from '../interfaces/error.interface'

export class UserModel {
  //    Get All Users
  static async index(): Promise<IUser[]> {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const query = `SELECT id, email, username, firstname, lastname FROM users`
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
      //    4. Close the connection
      client.release()
    }
  }
  //    Get One User
  static async show(id: string): Promise<IUser> | never {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const query = `SELECT id, email, username, firstname, lastname FROM users WHERE id = ($1)`
      const {
        rows: [result]
      } = await client.query(query, [id])

      if (!result)
        return throwError({ message: 'User not found', statusCode: 404 })
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
  //    Create User
  static async create(user: IUser): Promise<IUser> | never {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the query
      const query = `INSERT INTO users (email, username, firstname, lastname, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, username, firstname, lastname`
      const {
        rows: [result]
      } = await client.query(query, [
        user.email.toLowerCase(),
        user.username.toLowerCase(),
        user.firstname,
        user.lastname,
        await hashPassword(user.password)
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
  //    Edit User
  static async edit(user: Partial<IUser>): Promise<IUser> | never {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the queries
      const selectQuery = `SELECT email, username, firstname, lastname FROM users WHERE id = ($1)`
      const {
        rows: [result]
      } = await client.query(selectQuery, [user.id])
      //    3. Return the data
      if (!result)
        throwError({
          message: `There is no user with id "${user.id}"`,
          statusCode: 404
        })
      const email = user.email ? user.email : result.email
      const username = user.username ? user.username : result.username
      const firstname = user.firstname ? user.firstname : result.firstname
      const lastname = user.lastname ? user.lastname : result.lastname

      const updateQuery = `UPDATE users SET email=$1, username=$2, firstname=$3, lastname=$4 WHERE id=$5 RETURNING id, email, username, firstname, lastname`
      const {
        rows: [updatedUser]
      } = await client.query(updateQuery, [
        email.toLowerCase(),
        username.toLowerCase(),
        firstname,
        lastname,
        user.id
      ])

      return updatedUser
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
  //    Delete User
  static async delete(id: string): Promise<IUser> | never {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the queries
      const selectQuery = `SELECT COUNT(*) FROM users WHERE id = ($1)`
      const {
        rows: [{ count: result }]
      } = await client.query(selectQuery, [id])
      if (parseInt(result) === 0)
        throwError({
          message: `There is no user with id "${id}"`,
          statusCode: 404
        })

      const deleteQuery = `DELETE FROM users WHERE id = ($1) RETURNING id, email, username, firstname, lastname`
      const {
        rows: [user]
      } = await client.query(deleteQuery, [id])
      //    3. Return the data
      return user
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
  //  Authenticate User
  static async authenticate(
    email: string,
    password: string
  ): Promise<Partial<IUser>> | never {
    //    1. Open Connection with database
    const client = await db.connect()
    try {
      //    2. Run the queries
      const query = `SELECT * FROM users WHERE email = ($1)`
      const {
        rows: [user]
      } = await client.query(query, [email.toLowerCase()])
      //    3. Return the data
      if (!user)
        throwError({
          message: `Invalid Credentials`,
          statusCode: 401
        })

      const isValidPassword = await validatePassword(password, user.password)
      if (!isValidPassword) {
        throwError({
          message: `Invalid Credentials`,
          statusCode: 401
        })
      }

      return {
        id: user.id,
        email: email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname
      }
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
