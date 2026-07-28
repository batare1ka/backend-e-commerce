/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('comments', (table) => {
    table.bigIncrements('id');
    table.text('content').notNullable();

    table.integer('task_id').unsigned().notNullable();
    table
      .foreign('task_id')
      .references('id')
      .inTable('tasks')
      .onDelete('CASCADE');

    table.integer('user_id').unsigned().notNullable();
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('comments');
}
