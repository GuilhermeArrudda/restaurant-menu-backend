import { prisma } from '@/config/database'
import { cartItemData, shoppingSessionData } from '@/services/cartService'

interface updateCartItem {
	id: number,
	quantity: number
}

async function findSession(clientId: number) {
	const session = await prisma.shoppingSession.findFirst({
		where: {clientId}
	})
	return session
}

async function createSession(data: shoppingSessionData) {
	await prisma.shoppingSession.create({
		data: data
	})
}

async function insert(data: cartItemData) {
	await prisma.cartItem.create({
		data: data
	})
}

async function getProductByProductId(productId: number, sessionId: number) {
	const cartItem = await prisma.cartItem.findFirst({
		where: {
			productId: productId,
			shoppingSessionId: sessionId
		},
		include: {
			products: true
		}
	})
	return cartItem
}

async function update({ id, quantity }: updateCartItem) {
	return prisma.cartItem.update({
		where: {
			id: id
		},
		data: {
			quantity: { increment: quantity }
		}
	})
}

async function findCartByClientId(clientId: number) {
	const cart = await prisma.shoppingSession.findFirst({
		where: { 
			clientId 
		},
		include: {
			cartItens: {
				orderBy: {
					productId: 'desc'
				},
				include: {
					products: true,
				}
			}
		}
	}) 
	return cart
}

async function deleteCartItem(id: number) {
	return await prisma.cartItem.delete({
		where: {
			id: id
		}
	})
}

async function finishSessionById(id: number) {
	return await prisma.shoppingSession.delete({
		where: {
			id: id
		}
	})
}

async function findSessionById(id: number) {
	const session = await prisma.shoppingSession.findUnique({
		where: {
			id: id
		}
	})
	return session
}

export const cartRepository = {
	findSession,
	createSession,
	insert,
	getProductByProductId,
	update,
	findCartByClientId,
	deleteCartItem,
	finishSessionById,
	findSessionById
}