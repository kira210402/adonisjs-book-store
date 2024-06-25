import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(6),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(6),
  })
)
