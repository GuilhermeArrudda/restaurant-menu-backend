import joi from 'joi'
import { ClientData } from '../services/userService'

export const authSchema = joi.object<ClientData>({
	name: joi.string().required(),
	email: joi.string().required(),
	password: joi.string().required()
})