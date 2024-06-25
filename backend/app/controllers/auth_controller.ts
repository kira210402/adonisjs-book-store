import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ request }: HttpContext) {
    const data = request.only(['username', 'password'])
    const payload = await loginValidator.validate(data)
    const user = await User.findBy('username', payload.username)
    if (!user) throw new Error('User not found')
    const match = await hash.verify(user?.$attributes.password, payload.password)
    if (!match) throw new Error('Invalid password')
    return {
      messages: 'User logged in',
    }
  }

  async register({ request }: HttpContext) {
    const data = request.only(['username', 'email', 'password'])
    const payload = await registerValidator.validate(data)
    const existedEmail = await User.findBy('email', payload.email)
    const existedUsername = await User.findBy('username', payload.username)
    if (existedEmail) {
      throw new Error('Email already exists')
    } else if (existedUsername) {
      if (existedUsername) {
        throw new Error('Username already exists')
      }
    }
    const user = await User.create(payload)
    return {
      messages: 'User registered',
      user,
    }
  }
}
