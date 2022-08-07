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

const router = Router()

router.route('/').get(authenticationMiddleware, getAllUsers).post(createUser)
router
  .route('/:id')
  .get(authenticationMiddleware, getUser)
  .patch(authenticationMiddleware, updateUser)
  .delete(authenticationMiddleware, deleteUser)
router.post('/authenticate', authenticateUser)

export default router
