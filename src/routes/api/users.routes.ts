import { Router } from 'express'
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  authenticateUser
} from '../../controllers/user.controller'
import {
  getUserOrders,
  getUserOrdersByStatus
} from '../../controllers/order.controller'
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
// Get User Orders
router.get('/:id/orders', authenticationMiddleware, getUserOrders)
// Get User Orders By STATUS
router.get(
  '/:id/orders/statuses/:status',
  authenticationMiddleware,
  getUserOrdersByStatus
)

export default router
