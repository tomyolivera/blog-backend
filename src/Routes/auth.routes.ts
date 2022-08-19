import { Router } from 'express'
const authRouter = Router()

import AuthController from '../Controllers/AuthController'
import { isAuthenticated } from '../Controllers/Middleware'

authRouter
.post('/register', AuthController.register)
.post('/login', AuthController.login)
.get('/logout', isAuthenticated, AuthController.logout)

export default authRouter