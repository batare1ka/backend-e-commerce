/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('workspaces', (table) => {
    table.bigIncrements('id');
    table.string('name', 255).notNullable();
    table.text('description').nullable();
    table.integer('owner_id').unsigned().notNullable();
    table
      .foreign('owner_id')
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
  await knex.schema.dropTableIfExists('workspaces');
}
