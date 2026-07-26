/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.bigIncrements('id');
    table.string('email', 255).notNullable().unique();
    table.string('username', 60).notNullable().unique();
    table.string('password_hash', 255).notNullable();
    table.string('first_name', 100).nullable();
    table.string('last_name', 100).nullable();
    table.string('display_name', 120).nullable();
    table.string('phone', 30).nullable();
    table.boolean('is_active').notNullable().defaultTo(true);
    table.boolean('is_verified').notNullable().defaultTo(false);
    table
      .string('role', 30)
      .notNullable()
      .defaultTo('user')
      .checkIn(['user', 'moderator', 'admin', 'support']);
    table.timestamps(true, true);
    table.timestamp('last_login_at').nullable();
    table.timestamp('password_changed_at').nullable();
    table.timestamp('deleted_at').nullable();
    table.text('avatar_url').nullable();
    table.text('bio').nullable();
    table.string('preferred_language', 10).defaultTo('en');
    table.string('country_code', 2).nullable();
    table.string('timezone', 64).notNullable().defaultTo('UTC');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('users');
}
