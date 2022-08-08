import { body } from 'express-validator'

export const authenticateUserValidator = [
  body('email', 'email must be a valid email address')
    .isEmail()
    .normalizeEmail(),
  body('password', 'password must be at least 6 characters long').isLength({
    min: 6
  })
]
