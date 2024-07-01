import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    authorId: vine.number(),
    price: vine.number(),
  })
)

export const updateBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    authorId: vine.number(),
    price: vine.number(),
  })
)
