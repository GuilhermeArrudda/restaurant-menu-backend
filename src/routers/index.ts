import { Router } from 'express'
import cartRouter from './cartRouter'
import productsRouter from './productsRouter'
import userRouter from './userRouter'


const router = Router()
router.use(userRouter)
router.use(productsRouter)
router.use(cartRouter)
export default router
