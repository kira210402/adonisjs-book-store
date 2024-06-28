import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import user_service from '#services/user_service'
@inject()
export default class UsersController {
  async index({ request, response }: HttpContext) {
    const { page, perPage } = request.qs()
    const { data, pagination } = await user_service.pagination(page, perPage)
    return response.status(ResponseStatus.Ok).json({
      statusCode: ResponseStatus.Ok,
      messages: 'User list',
      data,
      pagination,
    })
  }
  // async index({ pagination }: HttpContext) {
  //   const { perPage, page } = pagination
  //   return User.query().paginate(page, perPage)
  // }

  // async store({ request }: HttpContext) {
  //   const data = request.only(['username', 'email', 'password'])
  //   const payload = await createUserValidator.validate(data)
  //   return User.create(payload)
  // }

  // async show({ params }: HttpContext) {
  //   const user = await User.findOrFail(params.id)
  //   return user
  // }

  async show({ params, response }: HttpContext) {
    const user = await user_service.show(params.id)
    return response.status(ResponseStatus.Ok).json({
      statusCode: ResponseStatus.Ok,
      messages: 'User detail',
      data: user,
    })
  }

  // async update({ params, request }: HttpContext) {
  //   const user = await User.findOrFail(params.id)
  //   const data = request.only(['username', 'email', 'password'])
  //   const payload = await updateUserValidator.validate(data)
  //   user.merge(payload)
  //   await user.save()
  //   return user
  // }

  async update({ params, request, response }: HttpContext) {
    const user = await user_service.update(params.id, request.body())
    return response.status(ResponseStatus.Ok).json({
      statusCode: ResponseStatus.Ok,
      messages: 'User updated',
      data: user,
    })
  }

  // async destroy({ params }: HttpContext) {
  //   const user = await User.findOrFail(params.id)
  //   await user.delete()
  //   return null
  // }

  async destroy({ params, response }: HttpContext) {
    await user_service.destroy(params.id)
    return response.status(ResponseStatus.Ok).json({
      statusCode: ResponseStatus.Ok,
      messages: 'User deleted',
    })
  }
}
