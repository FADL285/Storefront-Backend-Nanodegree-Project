import { body } from 'express-validator'

const schema = [
  body('email', 'email must be a valid email address')
    .isEmail()
    .normalizeEmail(),
  body('password', 'password must be at least 6 characters long').isLength({
    min: 6
  })
]

export { schema as authenticateUserSchema }
