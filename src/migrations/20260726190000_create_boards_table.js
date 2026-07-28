/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('boards', (table) => {
    table.bigIncrements('id');
    table.string('title', 255).notNullable();
    table.json('columns').notNullable().defaultTo('[]');

    table.integer('workspace_id').unsigned().notNullable();
    table
      .foreign('workspace_id')
      .references('id')
      .inTable('workspaces')
      .onDelete('CASCADE');

    table.integer('created_by').unsigned().notNullable();
    table
      .foreign('created_by')
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
  await knex.schema.dropTableIfExists('boards');
}
