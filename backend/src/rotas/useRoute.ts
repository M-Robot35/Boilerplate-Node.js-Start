import { Router } from 'express'
import UserController from '../controllers/UserController'
import UserMiddleware from '../middleware/UserMiddleware'
import OauthJwt from '../middleware/Oauth-jwt'
import login from '../middleware/LoginMiddleware'


const userRouter= Router()

userRouter.post('/user/create', UserMiddleware.create, UserController.create)
userRouter.post("/user/login", login.tokenGenerate);

userRouter.use(OauthJwt)

userRouter.post("/user/admin", UserController.getUser);

export default userRouter