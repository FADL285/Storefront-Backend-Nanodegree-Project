export interface IError extends Error {
  statusCode?: number
  detail?: string
  code?: string
}
