import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
// import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ request, response, auth }: HttpContext) {
    const data = request.only(['email', 'password'])
    const { email, password } = await loginValidator.validate(data)
    const user = await User.verifyCredentials(email, password)
    const token = await auth.use('jwt').generate(user) as {
      token: string,
      type: string,
      expiresIn: number | string | undefined,
    }
    return response.ok({
      messages: 'Login success!',
      accessToken: token.token,
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
    return response.created({
      messages: 'Register success!',
      user,
    })
  }

  async logout({ response, auth }: HttpContext) {
    // await auth.use('jwt').revoke()
    // delete token from database
    
    return response.ok({
      messages: 'Logout success!',
    })
  }
}
