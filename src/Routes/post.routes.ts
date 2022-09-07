import { Router } from 'express'
const postRouter = Router()

import PostController from '../Controllers/PostController'
import { isAuthenticated } from '../Controllers/Middleware'

postRouter.get('/user/:user_id', PostController.getByUserId)

postRouter.route('/')
    .get(PostController.getAll)
    .post(isAuthenticated, PostController.create)

postRouter.route('/:id')
    .get(PostController.getById)
    .put(isAuthenticated, PostController.update)
    .delete(isAuthenticated, PostController.delete)

export default postRouter