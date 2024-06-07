import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'threads'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.text('body').notNullable()
      table.string('title').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('id').inTable('users')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
