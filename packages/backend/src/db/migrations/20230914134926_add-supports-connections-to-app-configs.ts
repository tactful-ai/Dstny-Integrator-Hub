import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('app_configs', (table) => {
    table.boolean('supports_connections').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('app_configs', (table) => {
    table.dropColumn('supports_connections');
  });
}
