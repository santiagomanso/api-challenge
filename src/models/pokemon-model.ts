import { prisma } from '../config/prismaClient'
import { SinglePokemon } from '../types/pokemon-interfaces'
import { InputPatchType, InputPostBody } from '../validations/pokemon-schemas'

export class PokemonModel {
  static getAll = async () => {
    return await prisma.pokemons.findMany({
      orderBy: {
        id: 'asc',
      },
    })
  }

  static getById = async (id: number) => {
    return await prisma.pokemons.findFirst({
      where: {
        id: id,
      },
    })
  }

  static updateById = async ({
    id,
    input,
  }: {
    id: number
    input: InputPatchType
  }) => {
    return await prisma.pokemons.update({
      where: {
        id: id,
      },
      data: input,
    })
  }

  static create = async (input: InputPostBody) => {
    return prisma.pokemons.create({
      data: input,
    })
  }

  static delete = async (id: number) => {
    return prisma.pokemons.delete({
      where: {
        id: id,
      },
    })
  }

  static createMany = async (pokemons: SinglePokemon[]) => {
    return await prisma.pokemons.createMany({
      data: pokemons,
    })
  }

  static deleteMany = async () => {
    return prisma.pokemons.deleteMany()
  }
}
