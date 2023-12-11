import { Router } from 'express'
import { PokemonController } from '../controllers/pokemon-controller'

export const pokemonRouter = Router()

pokemonRouter.get('/', PokemonController.getAll)
pokemonRouter.get('/:id', PokemonController.getById)
pokemonRouter.post('/new', PokemonController.create)
pokemonRouter.patch('/update/:id', PokemonController.updateById)
pokemonRouter.delete('/delete/:id', PokemonController.delete)
