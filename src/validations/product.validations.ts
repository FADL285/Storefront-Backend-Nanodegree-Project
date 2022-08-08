import { body } from 'express-validator'

export const createProductValidator = [
  body('name', 'name must be at least 3 characters long')
    .isLength({ min: 3 })
    .matches(/\w/),
  body('price', 'price must be number greater than 0').isFloat({ gt: 0 }),
  body(
    'category',
    'category must contain letters only and at least 3 characters long and contain only letters'
  )
    .isLength({ min: 3 })
    .isAlpha()
]
