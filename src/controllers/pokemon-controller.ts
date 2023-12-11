import { Request, Response } from 'express'
import {
  validateId,
  validatePatchBody,
  validatePostBody,
} from '../validations/pokemon-schemas.js'
import chalk from 'chalk'
import { PokemonModel } from '../models/pokemon-model.js'

export class PokemonController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const pokemons = await PokemonModel.getAll()

      if (pokemons.length === 0) {
        return res.status(200).json({
          message: 'No content',
        })
      }

      return res.status(200).json(pokemons)
    } catch (error) {
      console.log(chalk.redBright.inverse(error))
      res.status(500).json({
        message: 'Fatal error',
        error,
      })
    }
  }

  static getById = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const { id } = req.params

      const parsedId = validateId({ id })

      if (!parsedId.success) {
        return res.status(400).json({
          error: parsedId.error,
        })
      }

      const pokemon = await PokemonModel.getById(parsedId.data.id)

      if (!pokemon) {
        return res.status(404).json({
          message: 'Pokemon not found',
        })
      }

      return res.status(200).json({
        pokemon,
      })
    } catch (error) {
      console.log(chalk.redBright.inverse(error))
      return res.status(500).json({
        message: 'Fatal error',
        error,
      })
    }
  }

  static updateById = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const { id } = req.params

      const parsedId = validateId({ id })

      if (!parsedId.success) {
        return res.status(400).json({
          error: parsedId.error,
        })
      }

      const existingPokemon = await PokemonModel.getById(parsedId.data.id)

      if (!existingPokemon) {
        return res.status(404).json({
          message: 'Pokemon not found',
        })
      }

      if (!req.body.types) {
        req.body.types = existingPokemon.types
      }

      const parsedBody = validatePatchBody(req.body)
      if (!parsedBody.success) {
        return res.status(400).json({
          message: 'error',
          error: parsedBody.error,
        })
      }

      const updatedPokemon = await PokemonModel.updateById({
        id: parsedId.data.id,
        input: parsedBody.data,
      })

      if (!updatedPokemon) {
        res.status(400).json({
          message: `Something went wrong while updating pokemon #${parsedId.data.id}`,
        })
      }

      return res.status(200).json({
        updatedPokemon: updatedPokemon,
      })
    } catch (error) {
      console.log(chalk.redBright.inverse(error))
      return res.status(500).json({
        message: 'Fatal Error',
        error,
      })
    }
  }

  static create = async (req: Request, res: Response) => {
    try {
      const parsedBody = validatePostBody(req.body)

      if (!parsedBody.success) {
        return res.status(400).json({
          message: parsedBody.error,
        })
      }

      const existingPokemon = await PokemonModel.getById(parsedBody.data.id)

      if (existingPokemon) {
        return res.status(400).json({
          message: 'Error: Pokemon already exists',
        })
      }

      const newPokemon = await PokemonModel.create(parsedBody.data)

      if (!newPokemon) {
        res.status(400).json({
          message: 'Error while creating pokemon',
        })
      }

      return res.status(200).json({
        message: 'Pokemon created successfully',
        newPokemon,
      })
    } catch (error) {
      console.log(chalk.redBright.inverse(error))
      return res.status(500).json({
        message: 'Fatal error',
        error,
      })
    }
  }

  static delete = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const parsedId = validateId(req.params)

      if (!parsedId.success) {
        return res.status(400).json({
          message: 'Invalid id',
        })
      }

      const existingPokemon = await PokemonModel.getById(parsedId.data.id)

      if (!existingPokemon) {
        return res.status(404).json({
          message: 'Pokemon not found',
        })
      }

      const deletedPokemon = await PokemonModel.delete(parsedId.data.id)

      if (!deletedPokemon) {
        return res.status(400).json({
          message: 'There was an error while deleting pokemon',
        })
      }

      return res.status(200).json({
        message: 'Pokemon deleted successfully',
      })
    } catch (error) {
      console.log(chalk.redBright.inverse(error))
      return res.status(500).json({
        message: 'Fatal error',
        error,
      })
    }
  }
}
