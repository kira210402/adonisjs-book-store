import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('email').notNullable().defaultTo('none@gmail.com')
    })
    // this.schema.table(this.tableName, (table) => {
    //   table.text('description').defaultTo('false')
    // })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('email')
    })
    // this.schema.table(this.tableName, (table) => {
    //   table.dropColumn('description')
    // })
  }
}
