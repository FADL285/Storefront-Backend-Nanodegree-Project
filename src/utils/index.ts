import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { IError } from '../interfaces/error.interface'
import config from '../config'
import { IUser } from '../interfaces/user.interface'

export const throwError = ({
  message,
  statusCode,
  code,
  detail
}: Partial<IError>) => {
  if (code === '23505') {
    statusCode = 409
    message = detail
      ? detail.replace(/[()]/gi, '').substring(4).replace('=', ': ')
      : message
  } else if (code === '22P02') {
    statusCode = 400
    message = (message as string).replace('type ', '')
  }
  const error: IError = new Error(message)
  error.statusCode = statusCode
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
