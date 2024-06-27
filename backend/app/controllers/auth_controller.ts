import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import { messages } from '@vinejs/vine/defaults'
// import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const data = request.only(['email', 'password'])
    const { email, password } = await loginValidator.validate(data)
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return response.status(200).json({
      messages: 'Login success!',
      token: token.toJSON().token,
    })
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
    return response.status(201).json({
      messages: 'Register success!',
      user,
    })
  }

  async logout({ auth }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return {
      messages: 'logout success!',
    }
  }

  async me({ auth }: HttpContext) {
    const user = auth.check()
    return {
      user: auth.user,
    }
  }
}
