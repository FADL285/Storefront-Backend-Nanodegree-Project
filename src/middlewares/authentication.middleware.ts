import { Request, Response, NextFunction } from 'express'
import { throwError, verifyToken } from '../utils'

const authErrorHandler = () =>
  throwError({ message: 'Invalid Credentials', statusCode: 401 })

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader: string | undefined = req.get('Authorization')
    if (!authHeader) authErrorHandler()
    else {
      const bearer = authHeader.split(' ')[0].toLowerCase()
      const token = authHeader.split(' ')[1]
      if (!(token && bearer === 'bearer')) authErrorHandler()
      verifyToken(token)
      next()
    }
  } catch (err) {
    next(err)
  }
}

export default authenticationMiddleware
