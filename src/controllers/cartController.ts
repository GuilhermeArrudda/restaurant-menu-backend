import { Request, Response } from 'express'
import { cartService, shoppingSessionData } from '@/services/cartService'
import jwt from 'jsonwebtoken'

async function insertItem(req: Request, res: Response) {
	const cartItem = req.body

	const authorization = req.headers.authorization

	const token = authorization.replace('Bearer ', '')
	const secretKey = process.env.JWT_SECRET

	const { userId } = jwt.verify(token, secretKey) as { userId: number }

	const shoppingSession: shoppingSessionData = {clientId: userId, total: 0}
	
	await cartService.insert(cartItem, shoppingSession)

	res.sendStatus(201)
}

async function getCart(req: Request, res: Response) {
	const authorization = req.headers.authorization
	const token = authorization.replace('Bearer ', '')
	const secretKey = process.env.JWT_SECRET

	const { userId } = jwt.verify(token, secretKey) as { userId: number }

	const cart = await cartService.getCart(userId)

	res.status(200).send(cart)
}

async function deleteCartItem(req: Request, res: Response) {
	const { id } = req.params
	const authorization = req.headers.authorization
	const token = authorization.replace('Bearer ', '')
	const secretKey = process.env.JWT_SECRET

	const { userId } = jwt.verify(token, secretKey) as { userId: number }

	await cartService.deleteCartItem(parseInt(id), userId)

	res.sendStatus(200)
}

async function finishSession(req: Request, res: Response) {
	const { id } = req.params
	const authorization = req.headers.authorization
	const token = authorization.replace('Bearer ', '')
	const secretKey = process.env.JWT_SECRET

	const { userId } = jwt.verify(token, secretKey) as { userId: number }

	await cartService.finishSession(parseInt(id), userId)

	res.sendStatus(200)
}

export const cartController = {
	insertItem,
	getCart,
	deleteCartItem,
	finishSession
}