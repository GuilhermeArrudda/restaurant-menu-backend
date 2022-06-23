import { cartItem, shoppingSession } from '@prisma/client'
import { cartRepository } from '@/repositories/cartRepositories'
import { notFoundError, unauthorizedError } from '@/utils/errorUtils'

export type cartItemData = Omit<cartItem, 'id'>
export type shoppingSessionData = Omit<shoppingSession, 'id'>
export type session = shoppingSession

async function createShoppingSession(shoppingSession: shoppingSessionData){
	await createSession(shoppingSession)

	const clientSession = await cartRepository.findSession(shoppingSession.clientId)

	return clientSession
}

async function insert(data: cartItemData, shoppingSession: shoppingSessionData){

	let session: session

	const clientSession = await cartRepository.findSession(shoppingSession.clientId)
	if(!clientSession) {
		session = await createShoppingSession(shoppingSession)
	} else {
		session = clientSession
	}

	const cartItemData = { ...data, shoppingSessionId: session.id }
	
	const productInCart = await cartRepository.getProductByProductId(cartItemData.productId, cartItemData.shoppingSessionId)
	
	if(!productInCart){
		await cartRepository.insert(cartItemData)
		return
	} 
	
	if(productInCart.shoppingSessionId === cartItemData.shoppingSessionId) {
		const updateCartItem = {id: productInCart.id, quantity: cartItemData.quantity}
		await cartRepository.update(updateCartItem)
		return
	}
}

async function createSession(data: shoppingSessionData) {
	
	await cartRepository.createSession(data)
}

async function getCart(userId: number) {
	const cart = await cartRepository.findCartByClientId(userId)

	return cart
}

async function deleteCartItem(cartItemId: number, clientId: number) {

	const session = await cartRepository.findSession(clientId)
	const cartItemAlreadyExist = await cartRepository.getProductByProductId(cartItemId, session.id)

	if(!cartItemAlreadyExist) throw notFoundError('cartItem does not exist')

	await cartRepository.deleteCartItem(cartItemAlreadyExist.id)
}

async function finishSession(id: number, clientId: number) {

	const sessionAlreadyExist = await cartRepository.findSessionById(id)
	if(!sessionAlreadyExist) throw notFoundError('shoppingSession does not exist')

	if(sessionAlreadyExist.clientId !== clientId) throw unauthorizedError('you are not allowed to finalize this cart')

	await cartRepository.finishSessionById(id)
}

export const cartService = {
	insert,
	getCart,
	deleteCartItem,
	finishSession
}