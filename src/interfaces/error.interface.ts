import { ValidationError } from 'express-validator'

export interface IError extends Error {
  statusCode?: number
  detail?: string
  code?: string
  errors?: ValidationError[]
}
