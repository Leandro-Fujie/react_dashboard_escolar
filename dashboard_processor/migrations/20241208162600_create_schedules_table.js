// migrations/{timestamp}_create_schedules_table.js
exports.up = function (knex) {
  return knex.schema.createTable('schedules', (table) => {
    table.increments('id').primary();
    table.integer('student_id').unsigned().notNullable();
    table.integer('teacher_id').unsigned().notNullable();
    table.dateTime('schedule_date').notNullable(); // Data e hora do agendamento
    table.string('status').defaultTo('scheduled'); // Status do agendamento (ex: agendado, cancelado)
    table.string('content'); // Adicionando coluna content
    table.foreign('student_id').references('id').inTable('students').onDelete('CASCADE');
    table.foreign('teacher_id').references('id').inTable('teachers').onDelete('CASCADE');
    table.timestamps(true, true); // Timestamps para created_at e updated_at
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('schedules');
};
