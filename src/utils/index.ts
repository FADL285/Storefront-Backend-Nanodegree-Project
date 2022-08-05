import { IError } from '../interfaces/error.interface'

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
