import { Router } from 'express'
import userController from '@/controllers/userController'
import { tokenValidationMiddleware } from '@/middlewares/tokenValidationMiddleware'
import { validateSchemaMiddleware } from '@/middlewares/validateSchemaMiddleware'
import { authSchema, signUp } from '@/schemas/userSchema'

const userRouter = Router()

userRouter.post('/sign-up', validateSchemaMiddleware(signUp), userController.signUp)
userRouter.post('/login', validateSchemaMiddleware(authSchema), userController.login)
userRouter.post('/logout', tokenValidationMiddleware, (req, res) => res.send('ok'))

export default userRouter