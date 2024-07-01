import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Book from './book.js'

export default class Author extends BaseModel {
  @hasMany(() => Book)
  declare books: HasMany<typeof Book>

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare yearOfBirth: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
