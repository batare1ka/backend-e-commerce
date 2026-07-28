/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('attachments', (table) => {
    table.bigIncrements('id');

    table.integer('task_id').unsigned().notNullable();
    table
      .foreign('task_id')
      .references('id')
      .inTable('tasks')
      .onDelete('CASCADE');

    table.integer('uploaded_by').unsigned().notNullable();
    table
      .foreign('uploaded_by')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.string('original_name', 255).notNullable();
    table.string('file_name', 255).notNullable();
    table.text('file_url').notNullable();
    table.string('mime_type', 100).nullable();
    table.bigInteger('size').nullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('attachments');
}
