import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('app_configs', (table) => {
    table.string('key').nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('app_configs', (table) => {
    table.string('key').notNullable().alter();
  });
}
