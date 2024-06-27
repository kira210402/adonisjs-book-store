import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class PaginationMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request } = ctx

    const pagination = {
      perPage: request.input('per_page', 10),
      page: request.input('page', 1),
    }

    ctx.pagination = pagination

    const output = await next()
    return output
  }
}
