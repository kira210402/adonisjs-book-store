import vine from '@vinejs/vine'

const password = vine.string().trim().minLength(6)

export const registerValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('username', value).first()
        return !match
      }),
    email: vine
      .string()
      .trim()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        return !match
      }),
    password,
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().normalizeEmail(),
    password,
  })
)
