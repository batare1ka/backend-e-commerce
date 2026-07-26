/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('user_workspaces', (table) => {
    table.bigIncrements('id');
    table.integer('user_id').unsigned().notNullable();
    table.integer('workspace_id').unsigned().notNullable();
    table
      .string('role', 30)
      .notNullable()
      .defaultTo('member')
      .checkIn(['owner', 'admin', 'member']);
    table.timestamp('joined_at').notNullable().defaultTo(knex.fn.now());

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .foreign('workspace_id')
      .references('id')
      .inTable('workspaces')
      .onDelete('CASCADE');

    table.unique(['user_id', 'workspace_id']);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('user_workspaces');
}
