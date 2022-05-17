import joi from 'joi'
import { CreateClientData } from '../services/userService'

export const authSchema = joi.object<CreateClientData>({
	email: joi.string().required(),
	password: joi.string().required()
})

export const signUp = joi.object<CreateClientData>({
	name: joi.string().required(),
	email: joi.string().required(),
	password: joi.string().required()
})