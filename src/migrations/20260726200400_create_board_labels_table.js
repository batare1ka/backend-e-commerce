/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('board_labels', (table) => {
    table.bigIncrements('id');

    table.integer('board_id').unsigned().notNullable();
    table
      .foreign('board_id')
      .references('id')
      .inTable('boards')
      .onDelete('CASCADE');

    table.integer('label_id').unsigned().notNullable();
    table
      .foreign('label_id')
      .references('id')
      .inTable('labels')
      .onDelete('CASCADE');

    table.unique(['board_id', 'label_id']);
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('board_labels');
}
