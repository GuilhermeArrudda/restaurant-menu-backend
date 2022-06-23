import { Router } from 'express'
import { cartController } from '@/controllers/cartController'
import { tokenValidationMiddleware } from '@/middlewares/tokenValidationMiddleware'

const cartRouter = Router()

cartRouter.post('/cart', tokenValidationMiddleware, cartController.insertItem)
cartRouter.get('/cart', tokenValidationMiddleware, cartController.getCart)
cartRouter.delete('/cart/cartItem/:id', tokenValidationMiddleware, cartController.deleteCartItem)
cartRouter.delete('/cart/shoppingSession/:id', tokenValidationMiddleware, cartController.finishSession)

export default cartRouter