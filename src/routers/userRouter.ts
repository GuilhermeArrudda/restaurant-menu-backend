import { Router } from 'express'
import userController from '../controllers/userController.js'
import { tokenValidationMiddleware } from '../middlewares/tokenValidationMiddleware.js'
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js'
import { authSchema, signUp } from '../schemas/userSchema.js'

const userRouter = Router()

userRouter.post('/sign-up', validateSchemaMiddleware(signUp), userController.signUp)
userRouter.post('/login', validateSchemaMiddleware(authSchema), userController.login)
userRouter.post('/logout', tokenValidationMiddleware, (req, res) => res.send('ok'))

export default userRouter