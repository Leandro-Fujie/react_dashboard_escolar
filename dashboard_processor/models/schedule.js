// models/schedule.js
const db = require('../db');  // Certifique-se de que o Knex (ou outro DB) está configurado corretamente

const Schedule = {
  // Criar um novo agendamento
  create: async ({ student_id, teacher_id, schedule_date, schedule_time, content }) => {
    try {
      const result = await db('schedules').insert({
        student_id,
        teacher_id,
        schedule_date,
        schedule_time,
        content
      });

      return result[0];  // Retorna o primeiro resultado do array (ID do novo agendamento)
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      throw error;
    }
  },

  // Obter todos os agendamentos
  getAll: async () => {
    try {
      return await db('schedules')
        .join('students', 'schedules.student_id', '=', 'students.id')
        .join('teachers', 'schedules.teacher_id', '=', 'teachers.id')
        .select('schedules.id', 'students.name as student_name', 'teachers.name as teacher_name', 'schedules.schedule_date', 'schedules.schedule_time', 'schedules.content', 'schedules.status');
    } catch (error) {
      console.error('Erro ao obter agendamentos:', error);
      throw error;
    }
  },

// Atualizar agendamento
update: async (id, { status, content, schedule_time }) => {
  const updateData = {};
  if (status) updateData.status = status;
  if (content) updateData.content = content;
  if (schedule_time) updateData.schedule_time = schedule_time;  // Adiciona o campo schedule_time

  await db('schedules').where('id', id).update(updateData);
  return { id, status, content, schedule_time };  // Retorna os dados atualizados
},

  // Deletar agendamento
  delete: async (id) => {
    try {
      const deletedRows = await db('schedules').where('id', id).del();

      if (deletedRows === 0) {
        return null;  // Não encontrou o agendamento
      }

      return true;  // Deletado com sucesso
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error);
      throw error;
    }
  },

  // Buscar um agendamento por ID
  findById: async (id) => {
    try {
      const result = await db('schedules').where('id', id).first();  // `.first()` retorna um único registro
      return result;
    } catch (error) {
      console.error('Erro ao buscar agendamento:', error);
      throw error;
    }
  }
};

module.exports = Schedule;
