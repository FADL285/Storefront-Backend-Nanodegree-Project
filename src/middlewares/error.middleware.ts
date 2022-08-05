import { Request, Response, NextFunction } from 'express'
import { IError } from '../interfaces/error.interface'

export const errorMiddleware = (
  error: IError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = error.status || 500
  res.status(status).json({
    status: 'error',
    message: error.message || 'Oops! Something went wrong.'
  })
}
