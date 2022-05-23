import { Router } from 'express'
// import cartRouter from './cartRouter.js'
import productsRouter from './productsRouter.js'
import userRouter from './userRouter.js'


const router = Router()
router.use(userRouter)
router.use(productsRouter)
// router.use(cartRouter)
export default router
