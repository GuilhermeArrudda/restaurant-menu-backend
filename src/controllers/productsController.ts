import { Request, Response } from 'express'
import { productsService } from '../services/productsService.js'

async function getProducts(req: Request, res: Response) {
	const products = await productsService.get()

	res.send(products).status(200)
}

export const productsController = {
	getProducts
}