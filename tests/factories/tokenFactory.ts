import { userBodyFactory } from './userBodyFactory'
import jwt from 'jsonwebtoken'
import { userFactory } from './userFactory'

export async function tokenFactory() {
	const client = userBodyFactory
	
	const result = await userFactory(client)

	const token = jwt.sign({ userId: result.id }, process.env.JWT_SECRET)

	return token
}