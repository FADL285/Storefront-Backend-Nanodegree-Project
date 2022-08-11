import { Router } from 'express'
import authenticationMiddleware from '../../middlewares/authentication.middleware'
// import { requestValidationMiddleware } from '../../middlewares/request-validation.middleware'
import {
  getAllOrders,
  getAllOrdersByStatus,
  getOrder,
  createOrder,
  updateOrder
} from '../../controllers/order.controller'

const router = Router()

router.use(authenticationMiddleware)

router.route('/').get(getAllOrders).post(createOrder)
router.route('/:id').get(getOrder).patch(updateOrder)
router.get('/statuses/:status', getAllOrdersByStatus)

export default router
