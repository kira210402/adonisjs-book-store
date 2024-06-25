import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    author: vine.string().trim(),
    price: vine.number(),
  })
)

export const updateBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    author: vine.string().trim(),
    price: vine.number(),
  })
)
