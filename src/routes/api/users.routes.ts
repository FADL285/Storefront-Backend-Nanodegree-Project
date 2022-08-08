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
import { createUserSchema } from '../../schema/create-user.schema'
import { requestValidationMiddleware } from '../../middlewares/request-validation.middleware'
import { authenticateUserSchema } from '../../schema/authenticate-user.schema'

const router = Router()

router
  .route('/')
  .get(authenticationMiddleware, getAllUsers)
  .post(createUserSchema, requestValidationMiddleware, createUser)
router
  .route('/:id')
  .get(authenticationMiddleware, getUser)
  .patch(authenticationMiddleware, updateUser)
  .delete(authenticationMiddleware, deleteUser)
router.post(
  '/authenticate',
  authenticateUserSchema,
  requestValidationMiddleware,
  authenticateUser
)

export default router
