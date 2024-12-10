// models/student.js
const db = require('../db');  // Supondo que você use algum ORM como knex

const Student = {
  // Criar um novo estudante
  create: async ({
    cpf, name, surname, whatsapp, birth_date, email, phone, cep, address, houseNumber, neighborhood, state, city
  }) => {
    try {
      const result = await db('students').insert({
        cpf,
        name,
        surname,
        whatsapp,
        birth_date,
        email,
        phone,
        cep,
        address,
        houseNumber,
        neighborhood,
        state,
        city
      }).returning('*');  // Retorna todos os campos ou apenas o id

      return result[0];  // Retorna o primeiro item, que é o estudante criado
    } catch (error) {
      console.error('Erro ao criar estudante:', error);
      throw new Error('Erro ao criar estudante');
    }
  },

  // Atualizar estudante
  update: async (id, {
    name, surname, whatsapp, birth_date, email, phone, cep, address, houseNumber, neighborhood, state, city
  }) => {
    try {
      await db('students')
        .where('id', id)
        .update({
          name,
          surname,
          whatsapp,
          birth_date,
          email,
          phone,
          cep,
          address,
          houseNumber,
          neighborhood,
          state,
          city
        });

      return { id, name, surname, whatsapp, birth_date, email, phone, cep, address, houseNumber, neighborhood, state, city };
    } catch (error) {
      throw new Error('Erro ao atualizar estudante');
    }
  },

  // Obter todos os estudantes
  getAll: async () => {
    try {
      return await db('students').select('*');
    } catch (error) {
      throw new Error('Erro ao obter estudantes');
    }
  },

  // Deletar estudante
  deleteStudent: async (id) => {  // Alterei para o nome correto da função
    try {
      await db('students').where('id', id).del();
    } catch (error) {
      throw new Error('Erro ao deletar estudante');
    }
  },
};

module.exports = Student;
