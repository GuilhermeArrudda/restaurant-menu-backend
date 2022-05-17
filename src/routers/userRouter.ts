import { Router } from 'express'
import userController from '../controllers/userController.js'
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js'
import { authSchema, signUp } from '../schemas/userSchema.js'

const userRouter = Router()

userRouter.post('/sign-up', validateSchemaMiddleware(signUp), userController.signUp)
userRouter.post('/login', validateSchemaMiddleware(authSchema), userController.login)

export default userRouter