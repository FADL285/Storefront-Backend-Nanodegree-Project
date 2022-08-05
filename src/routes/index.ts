import { Router, Request, Response } from 'express'
import usersRoute from './api/users.route'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  res.json({
    message:
      'Welcome to Storefront, Read the API documentation to deal with app'
  })
})

// API Routes
router.use('/users', usersRoute)

// 404 Page Not Found
router.use((req: Request, res: Response) =>
  res.status(404).json({
    message:
      'Oops! You are lost, Read the API documentation to find your way back 🌏'
  })
)

export default router
