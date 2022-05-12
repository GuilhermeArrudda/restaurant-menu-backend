import primaryRepository from "../repositories/primaryRepository.js";

async function findMany() {
  return primaryRepository.findMany();
}

async function getById(id: number) {
  return primaryRepository.getById(id);
}

export default {
  findMany,
  getById,
};
