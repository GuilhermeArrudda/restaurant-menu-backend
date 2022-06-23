import { productsRepository } from '@/repositories/productsRepository'

async function get() {
	return productsRepository.findAll()
}

export const productsService = {
	get
}