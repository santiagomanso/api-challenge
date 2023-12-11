import { fetchAndParseFromPokeAPI } from './utils/fetchAndParseFromPokeAPI.js'
import chalk from 'chalk'
import { PokemonModel } from './models/pokemon-model.js'

const importData = async () => {
  try {
    await PokemonModel.deleteMany()
    const pokemons = await fetchAndParseFromPokeAPI()
    console.log(chalk.yellow.bold('⌛=> inserting pokemons into database'))
    console.log('')
    const databasePokemons = await PokemonModel.createMany(pokemons)
    if (!databasePokemons) {
      console.log(chalk.redBright.inverse('Error while importing pokemons!'))
    }
    console.log(chalk.green('✅ - Data imported!'))
    console.log('')
    console.log(chalk.green.inverse('   API OPRATIONAL   '))
    console.log('')
  } catch (error) {
    console.log(chalk.red.inverse(error))
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await PokemonModel.deleteMany()
    console.log(chalk.red('🚮 - Data destroyed!'))
  } catch (error) {
    console.log(chalk.red.inverse(error))
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
