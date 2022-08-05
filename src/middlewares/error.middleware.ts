import { Request, Response, NextFunction } from 'express'
import { IError } from '../interfaces/error.interface'

export const errorMiddleware = (
  error: IError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error.statusCode || 500
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: error.message || 'Oops! Something went wrong.'
  })
}
