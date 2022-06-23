import { Request, Response } from 'express'
import userService from '@/services/userService'

async function signUp(req: Request, res: Response) {
	const user = req.body

	await userService.signUp(user)

	res.sendStatus(201)
}

async function login(req: Request, res: Response) {
	const user = req.body

	const token = await userService.login(user)

	res.status(200).send({ token })
}

export default {
	signUp,
	login
}