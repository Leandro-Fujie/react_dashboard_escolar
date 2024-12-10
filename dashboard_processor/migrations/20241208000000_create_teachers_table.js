/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('teachers', (table) => {
      table.increments('id').primary(); // ID único para cada professor
      table.string('cpf').notNullable().unique(); // CPF único
      table.string('name').notNullable(); // Nome do professor
      table.string('surname').notNullable(); // Sobrenome
      table.string('specialty'); // Especialidade do professor
      table.boolean('status').defaultTo(true); // Status: Ativo ou Inativo
      table.timestamps(true, true); // Timestamps para created_at e updated_at
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('teachers');
  };
  