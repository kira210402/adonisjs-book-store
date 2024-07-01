import vine from '@vinejs/vine'

export const createAuthorValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    yearOfBirth: vine.number().min(1).max(2024),
  })
)

export const updateAuthorValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    yearOfBirth: vine.number().min(1).max(2024).optional(),
  })
)
