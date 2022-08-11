import { Router } from 'express'
import authenticationMiddleware from '../../middlewares/authentication.middleware'
// import { requestValidationMiddleware } from '../../middlewares/request-validation.middleware'
import {
  getAllOrders,
  getAllOrdersByStatus,
  getOrder,
  createOrder,
  updateOrder,
  getOrderProducts,
  addOrderProduct,
  getOrderProduct,
  updateOrderProductQuantity,
  deleteOrderProduct
} from '../../controllers/order.controller'

const router = Router()

router.use(authenticationMiddleware)

router.route('/').get(getAllOrders).post(createOrder)
router.route('/:id').get(getOrder).patch(updateOrder)
router.get('/statuses/:status', getAllOrdersByStatus)

router.route('/:id/products').get(getOrderProducts).post(addOrderProduct)
router
  .route('/:id/products/:prodId')
  .get(getOrderProduct)
  .patch(updateOrderProductQuantity)
  .delete(deleteOrderProduct)

export default router
