import { body } from 'express-validator'

export const createUserValidator = [
  body('email', 'email must be a valid email address')
    .isEmail()
    .normalizeEmail(),
  body(
    'username',
    'username must be valid and at least 4 characters long'
  ).isLength({ min: 4 }),
  body('firstname', 'firstname must contain letters only')
    .isLength({ min: 3 })
    .isAlpha(),
  body('lastname', 'lastname must contain letters only')
    .isLength({ min: 3 })
    .isAlpha(),
  body('password', 'password must be at least 6 characters long').isLength({
    min: 6
  })
]
