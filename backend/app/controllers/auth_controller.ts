import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const data = request.only(['email', 'password'])
    const { email, password } = await loginValidator.validate(data)
    // const user = await User.findBy('email', email)
    // if (!user) response.abort('User not found!')
    // const match = await hash.verify(user?.$attributes.password, password)
    // if (!match) response.abort('Password not match!')
    const user = await User.verifyCredentials(email, password)
    return {
      messages: 'User logged in',
    }
  }

  async register({ request, response }: HttpContext) {
    const data = request.only(['username', 'email', 'password'])
    const { username, email, password } = await registerValidator.validate(data)
    const existedEmail = await User.findBy('email', email)
    const existedUsername = await User.findBy('username', username)
    if (existedEmail) {
      response.abort('Email already exists')
    } else if (existedUsername) {
      response.abort('Username already exists')
    }
    const user = await User.create(data)
    return {
      messages: 'User registered',
      user,
    }
  }
}
