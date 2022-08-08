import { Router } from 'express'
import authenticationMiddleware from '../../middlewares/authentication.middleware'
import { requestValidationMiddleware } from '../../middlewares/request-validation.middleware'
import {
  getAllProducts,
  getProductsByCategory,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../../controllers/product.controller'
import { createProductValidator } from '../../validations/product.validations'

const router = Router()

router
  .route('/')
  .get(getAllProducts)
  .post(
    createProductValidator,
    requestValidationMiddleware,
    authenticationMiddleware,
    createProduct
  )
router.get('/categories/:category', getProductsByCategory)
router
  .route('/:id')
  .get(getProduct)
  .patch(authenticationMiddleware, updateProduct)
  .delete(authenticationMiddleware, deleteProduct)

export default router
