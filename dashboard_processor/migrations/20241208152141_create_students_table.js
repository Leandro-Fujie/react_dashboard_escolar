/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('students', (table) => {
      table.increments('id').primary(); // ID único para cada estudante
      table.string('cpf').notNullable().unique(); // CPF único
      table.string('name').notNullable(); // Nome do estudante
      table.string('surname').notNullable(); // Sobrenome
      table.date('birth_date'); // Data de nascimento
      table.string('email'); // E-mail do estudante
      table.string('phone'); // Telefone
      table.string('whatsapp').notNullable().unique(); // WhatsApp único
      table.string('cep'); // CEP
      table.string('address'); // Logradouro
      table.string('c'); // Número da casa
      table.string('neighborhood'); // Bairro
      table.string('state'); // Estado
      table.string('city'); // Cidade
      table.timestamps(true, true); // Timestamps para created_at e updated_at
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('students');
  };
