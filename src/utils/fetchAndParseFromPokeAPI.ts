import chalk from 'chalk'
import { InitialPokemon, SinglePokemon } from '../types/pokemon-interfaces'

export const fetchAndParseFromPokeAPI = async () => {
  console.log(chalk.yellow.bold('⌛=> fetching pokemons from pokeapi...'))
  const pokemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const { results } = await pokemons.json()
  const pokemonArray: SinglePokemon[] = await sanitizePokemons(results)
  return pokemonArray
}

export const sanitizePokemons = async (pokemonArray: InitialPokemon[]) => {
  console.log(
    chalk.yellow.yellow.bold('⏳=> Santizing pokemons to match criteria'),
  )
  const detailsPromises = pokemonArray.map(async (pokemon) => {
    const response = await fetch(pokemon.url)
    const details = await response.json()

    // Use the details to create a sanitized Pokemon
    const sanitizedPokemon: SinglePokemon = {
      id: details.id,
      name: details.name,
      weight: details.weight,
      types: details.types.map((type: any) => type.type.name), // Adjust types as needed
    }

    return sanitizedPokemon
  })

  const parsedPokemons = await Promise.all(detailsPromises)

  return parsedPokemons
}
