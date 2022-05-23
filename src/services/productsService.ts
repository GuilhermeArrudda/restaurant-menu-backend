import { productsRepository } from '../repositories/productsRepository.js'

async function get() {
	return productsRepository.findAll()
}

export const productsService = {
	get
}