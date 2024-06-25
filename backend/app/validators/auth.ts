import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    password: vine.string().trim().minLength(6),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(6),
  })
)
