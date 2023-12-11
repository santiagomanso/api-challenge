import z from 'zod'
import { PokemonEnums, SinglePokemon } from '../types/pokemon-interfaces'

const getByIdSchema = z
  .object({
    id: z.coerce
      .number({ invalid_type_error: 'id must be a number' })
      .int({
        message: 'id must be positive',
      })
      .min(1, {
        message: 'id must be at least 1',
      }),
  })
  .required()

export const validateId = (input: { id: number }) => {
  return getByIdSchema.safeParse(input)
}

const patchBodySchema = z.object({
  name: z.string().min(1, 'At least one char').optional(),
  weight: z.coerce
    .number({ invalid_type_error: 'weight must be a number' })
    .int()
    .min(1)
    .optional(),
  types: z.array(z.nativeEnum(PokemonEnums)).optional(),
})

export type InputPatchType = z.infer<typeof patchBodySchema>

export const validatePatchBody = (input: SinglePokemon) => {
  input.name ? (input.name = input.name.trim().toLowerCase()) : ''
  if (input.types.length > 0) {
    const transformedInput = {
      ...input,
      types: input.types.map((type) => type.toLowerCase().trim()),
    }
    return patchBodySchema.safeParse(transformedInput)
  } else return patchBodySchema.safeParse(input)
}

const postBodySchema = z.object({
  id: z.coerce
    .number({ invalid_type_error: 'id must be a number' })
    .int({
      message: 'id must be integer',
    })
    .min(1, {
      message: 'id must be at least 1',
    }),
  name: z.string().min(1, 'At least one char'),
  weight: z.coerce
    .number({ invalid_type_error: 'weight must be a number' })
    .int()
    .min(1),
  types: z.nativeEnum(PokemonEnums).array(),
})

export type InputPostBody = z.infer<typeof postBodySchema>

export const validatePostBody = (input: SinglePokemon) => {
  input.name ? (input.name = input.name.trim().toLowerCase()) : ''
  if (input.types) {
    const transformedInput = {
      ...input,
      types: input.types.map((type) => type.toLowerCase().trim()),
    }
    return postBodySchema.safeParse(transformedInput)
  }
  return postBodySchema.safeParse(input)
}
