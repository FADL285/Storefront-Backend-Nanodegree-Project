import { Router } from 'express'
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  authenticateUser
} from '../../controllers/user.controller'
import authenticationMiddleware from '../../middlewares/authentication.middleware'
import { createUserValidator } from '../../validations/users.validations'
import { requestValidationMiddleware } from '../../middlewares/request-validation.middleware'
import { authenticateUserValidator } from '../../validations/authentication.validations'

const router = Router()

router
  .route('/')
  .get(authenticationMiddleware, getAllUsers)
  .post(createUserValidator, requestValidationMiddleware, createUser)
router
  .route('/:id')
  .get(authenticationMiddleware, getUser)
  .patch(authenticationMiddleware, updateUser)
  .delete(authenticationMiddleware, deleteUser)
router.post(
  '/authenticate',
  authenticateUserValidator,
  requestValidationMiddleware,
  authenticateUser
)

export default router
