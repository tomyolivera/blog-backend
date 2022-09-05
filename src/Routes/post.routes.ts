import { Router } from 'express'
const postRouter = Router()

import PostController from '../Controllers/PostController'
import { isAuthenticated } from '../Controllers/Middleware'

postRouter
    .get('/', PostController.getAll)
    .get('/user/:user_id', PostController.getByUserId)
    .post('/', isAuthenticated, PostController.create)

    .route('/:id')
        .get(PostController.getById)
        .put(isAuthenticated, PostController.update)
        .delete(isAuthenticated, PostController.delete)

export default postRouter