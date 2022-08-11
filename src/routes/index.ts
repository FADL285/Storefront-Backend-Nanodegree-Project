import { Router, Request, Response } from 'express'
import usersRoute from './api/users.routes'
import productsRoutes from './api/products.routes'
import ordersRoutes from './api/orders.routes'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  res.json({
    message:
      'Welcome to Storefront, Read the API documentation to deal with app'
  })
})

// API Routes
router.use('/users', usersRoute)
router.use('/products', productsRoutes)
router.use('/orders', ordersRoutes)

// 404 Page Not Found
router.use((req: Request, res: Response) =>
  res.status(404).json({
    message:
      'Oops! You are lost, Read the API documentation to find your way back 🌏',
    statusCode: 404
  })
)

export default router
