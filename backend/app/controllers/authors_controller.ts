import Author from '#models/author'
import { createAuthorValidator, updateAuthorValidator } from '#validators/author'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

export default class AuthorsController {
  /**
   * Display a list of resource
   */
  async index({ response, pagination }: HttpContext) {
    const { perPage, page } = pagination
    const authors = await Author.query().paginate(page, perPage)
    return response.status(ResponseStatus.Ok).json(authors)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'yearOfBirth'])
    const payload = await createAuthorValidator.validate(data)
    const author = await Author.create(payload)
    return response.status(ResponseStatus.Created).json({
      message: 'Author created!',
      author,
    })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const author = await Author.findOrFail(params.id)
    return response.status(ResponseStatus.Ok).json(author)
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.only(['name', 'yearOfBirth'])
    const payload = await updateAuthorValidator.validate(data)
    const author = await Author.findOrFail(params.id)
    author.merge(payload)
    await author.save()
    return response.status(ResponseStatus.Ok).json({
      message: 'Update success!',
      author,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const author = await Author.findOrFail(params.id)
    await author.delete()
    return response.status(ResponseStatus.Ok).json({ message: 'Author deleted' })
  }
}
