export interface InitialPokemon {
  name: string
  url: string
}

export interface SinglePokemon {
  id: number
  name: string
  weight: number
  types: PokemonEnums[]
}

export type PokemonList = SinglePokemon[]

export enum PokemonEnums {
  NORMAL = 'normal',
  FIGHTING = 'fighting',
  FLYING = 'flying',
  POISON = 'poison',
  GROUND = 'ground',
  ROCK = 'rock',
  BUG = 'bug',
  GHOST = 'ghost',
  STEEL = 'steel',
  FIRE = 'fire',
  WATER = 'water',
  GRASS = 'grass',
  ELECTRIC = 'electric',
  PSYCHIC = 'psychic',
  ICE = 'ice',
  DRAGON = 'dragon',
  DARK = 'dark',
  FAIRY = 'fairy',
  UNKNOWN = 'unknown',
  SHADOW = 'shadow',
}
