import { Router } from 'express'
const userRouter = Router()

import UserController from '../Controllers/UserController'
import { isAuthenticated } from '../Controllers/Middleware'

userRouter
.get('/profile', isAuthenticated, UserController.getMyUser)
.get('/user/:username', UserController.getByUsername)

export default userRouter