import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class PaginationMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request } = ctx

    const pagination = {
      perPage: request.input('per_page', 10),
      page: request.input('page', 1),
    }

    ctx.pagination = pagination
    // const query = ctx.request.qs()
    // // explain by comment the following code lines

    // query.page = !query.page || (query.page && !Number(query.page)) ? 1 : Number(query.page)
    // query.perPage =
    //   !query.perPage || (query.perPage && !Number(query.perPage)) ? 10 : Number(query.perPage)

    // ctx.request.updateQs(query)
    return await next()
  }
}
