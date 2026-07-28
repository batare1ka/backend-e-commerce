/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('tasks', (table) => {
    table.bigIncrements('id');
    table.string('title', 255).notNullable();
    table.text('description').nullable();

    table.integer('board_id').unsigned().notNullable();
    table
      .foreign('board_id')
      .references('id')
      .inTable('boards')
      .onDelete('CASCADE');

    table.string('status', 50).nullable();

    table.integer('assignee_id').unsigned().nullable();
    table
      .foreign('assignee_id')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');

    table.integer('created_by').unsigned().notNullable();
    table
      .foreign('created_by')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.timestamp('due_date').nullable();
    table.integer('order').notNullable().defaultTo(0);

    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('tasks');
}
