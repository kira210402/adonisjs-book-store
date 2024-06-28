import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthException extends Exception {
  static status = 404
  static code = 'User not found'

  handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      message: error.code,
    })
  }
}
