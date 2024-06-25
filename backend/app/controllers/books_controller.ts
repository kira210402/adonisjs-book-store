import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import { createBookValidator, updateBookValidator } from '#validators/book'

export default class BooksController {
  /**
   * Display a list of resource
   */
  async index() {
    return Book.all()
  }

  /**
   * Display form to create a new record
   */
  // async create() {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.only(['title', 'author', 'price'])
    const payload = await createBookValidator.validate(data)
    return Book.create(payload)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return Book.findOrFail(params.id)
  }

  /**
   * Edit individual record
   */
  // async edit() {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    const data = request.only(['title', 'author', 'price'])
    const payload = await updateBookValidator.validate(data)
    book.merge(payload)
    await book.save()
    return book
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    await book.delete()
    return null
  }
}
