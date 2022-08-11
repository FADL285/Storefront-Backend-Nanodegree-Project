import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { IError } from '../interfaces/error.interface'
import config from '../config'
import { IUser } from '../interfaces/user.interface'

export const throwError = ({
  message,
  statusCode,
  code,
  detail,
  errors
}: Partial<IError>) => {
  if (code === '23505') {
    statusCode = 409
    message = detail
      ? detail.replace(/[()]/gi, '').substring(4).replace('=', ': ')
      : message
  } else if (code === '22P02') {
    statusCode = 400
    message = (message as string).replace('type ', '')
  } else if (code === '23503') {
    statusCode = 404
    if (detail?.includes('users')) message = 'Invalid userId, User not found.'
    else if (detail?.includes('products'))
      message = 'Invalid productId, Product not found.'
    else if (detail?.includes('orders'))
      message = 'Invalid orderId, Order not found.'
    else message = detail
  }
  const error: IError = new Error(message)
  error.statusCode = statusCode
  error.errors = errors
  throw error
}

export const hashPassword = async (password: string): Promise<string> =>
  await bcrypt.hash(
    `${password}_${config.bcryptPepper}`,
    parseInt(config.bcryptSalt as string)
  )

export const validatePassword = async (
  password: string,
  passwordHash: string
): Promise<boolean> =>
  await bcrypt.compare(`${password}_${config.bcryptPepper}`, passwordHash)

export const generateToken = (data: Partial<IUser>): string =>
  jwt.sign({ ...data }, config.tokenSecret as string)

export const verifyToken = (token: string): string | JwtPayload | never => {
  try {
    return jwt.verify(token, config.tokenSecret as string)
  } catch (err) {
    return throwError({ message: 'Invalid Credentials', statusCode: 401 })
  }
}
