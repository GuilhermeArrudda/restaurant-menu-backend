import { Router } from 'express'
import userController from '../controllers/userController.js'
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js'
import { authSchema } from '../schemas/userSchema.js'

const userRouter = Router()

userRouter.post('/sign-up', validateSchemaMiddleware(authSchema), userController.signUp)

export default userRouter