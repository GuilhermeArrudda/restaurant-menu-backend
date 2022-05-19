import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import userService from '../services/userService.js'
import { unauthorizedError } from '../utils/errorUtils.js'

export async function tokenValidationMiddleware(req: Request, res: Response, next: NextFunction) {
	const authorization = req.headers.authorization

	if(!authorization) throw unauthorizedError('Token inválido')

	const token = authorization.replace('Bearer ', '')
	const secretKey = process.env.JWT_SECRET

	const { userId } = jwt.verify(token, secretKey) as { userId: number }

	const user = await userService.findById(userId)

	res.locals.user = user

	next()
}