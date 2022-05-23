import { Router } from 'express'
import { productsController } from '../controllers/productsController.js'

const productsRouter = Router()

productsRouter.get('/products', productsController.getProducts)

export default productsRouter