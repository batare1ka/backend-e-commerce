/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();

    table.string('title', 255).notNullable();
    table.text('content').notNullable();

    table.string('slug', 255).notNullable().unique();

    table.integer('author_id').unsigned().notNullable();
    table
      .foreign('author_id')
      .references('id')
      .inTable('users') // assumes users table exists
      .onDelete('CASCADE');

    table.boolean('is_published').defaultTo(false);
    table.timestamp('published_at').nullable();

    table.integer('views').defaultTo(0);

    table.json('meta').nullable(); // SEO or extra data

    table.timestamps(true, true); // created_at, updated_at
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('users');
}
