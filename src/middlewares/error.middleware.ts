import { Request, Response, NextFunction } from 'express'
import { IError } from '../interfaces/error.interface'
import { ValidationError } from 'express-validator'

type bodyObject = {
  status?: string
  statusCode?: number
  message?: string
  errors?: ValidationError[]
}

export const errorMiddleware = (
  error: IError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error.statusCode || 500
  const bodyObject: bodyObject = {
    status: 'error',
    statusCode,
    message: error.message || 'Oops! Something went wrong.'
  }
  if (error.errors) {
    bodyObject.errors = error.errors
  }
  res.status(statusCode).json(bodyObject)
}
