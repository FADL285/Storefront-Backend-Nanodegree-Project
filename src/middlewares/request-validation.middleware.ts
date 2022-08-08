import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { throwError } from '../utils'

export const requestValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return throwError({
      message: 'Request body params is invalid',
      statusCode: 400,
      errors: errors.array()
    })
  }
  next()
}
