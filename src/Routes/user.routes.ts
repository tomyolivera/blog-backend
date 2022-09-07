import { Router } from 'express'
const userRouter = Router()

import UserController from '../Controllers/UserController'
import { isAdmin, isAuthenticated } from '../Controllers/Middleware'

userRouter.get('/search/:username', UserController.getByUsername)

userRouter.route('/user/:id')
    .put(isAdmin, UserController.update)
    .delete(isAdmin, UserController.delete)

userRouter.route('/profile')
    .get(isAuthenticated, UserController.getMyUser)
    .put(isAuthenticated, UserController.updateMyUser)
    .delete(isAuthenticated, UserController.deleteMyUser)

export default userRouter