import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table.text('description').defaultTo('false')
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('description')
    })
  }
}
