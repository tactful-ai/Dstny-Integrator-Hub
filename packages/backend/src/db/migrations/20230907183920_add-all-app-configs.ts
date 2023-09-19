import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('app_configs', (table) => {
    table.string('name');
    table.string('base_url');
    table.string('api_base_url');
    table.string('primary_color').defaultTo('000000');
    table.string('icon_url');
    table.string('auth_doc_url');
    table.uuid('user_id').references('id').inTable('users');

  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('app_configs', (table) => {
    table.dropColumn('name');
    table.dropColumn('base_url');
    table.dropColumn('api_base_url');
    table.dropColumn('primary_color');
    table.dropColumn('icon_url');
    table.dropColumn('auth_doc_url');
    table.dropColumn('user_id');
  });
}
