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

router.route('/').get(getAllUsers).post(createUser)
router
  .route('/:id')
  .get(getUser)
  .patch(authenticationMiddleware, updateUser)
  .delete(authenticationMiddleware, deleteUser)
router.post('/authenticate', authenticateUser)

export default router
