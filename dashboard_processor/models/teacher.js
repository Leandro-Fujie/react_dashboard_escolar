const db = require('../db');

const Teacher = {
  // Buscar professor pelo CPF
  getByCpf: async (cpf) => {
    try {
      const result = await db('teachers').where('cpf', cpf).first(); // Buscar professor pelo CPF
      return result;  // Retorna o professor ou undefined
    } catch (error) {
      console.error('Erro ao buscar professor pelo CPF:', error);
      throw new Error('Erro ao buscar professor pelo CPF');
    }
  },

  // Criar um novo professor
  create: async ({ cpf, name, surname, specialty, status }) => {
    try {
      const result = await db('teachers').insert({
        cpf,
        name,
        surname,
        specialty,
        status: status === "ativo",  // Status convertido em booleano
      }).returning('*');

      return result;  // Retorna o array com o novo professor
    } catch (error) {
      console.error('Erro ao criar professor:', error);
      throw new Error('Erro ao criar professor');
    }
  },


  // Atualizar informações do professor
  update: async (id, { name, surname, specialty, status }) => {
    try {
      // Convertendo o campo `status` para booleano
      const result = await db('teachers')
        .where('id', id)
        .update({
          name,
          surname,
          specialty,
          status: status === "ativo",  // Converte "ativo" para true e "inativo" para false
        })
        .returning('*');

      return result[0];  // Retorna o primeiro item, que é o professor atualizado
    } catch (error) {
      console.error('Erro ao atualizar professor:', error);
      throw new Error('Erro ao atualizar professor');
    }
  },

  // Obter todos os professores
  getAll: async () => {
    try {
      return await db('teachers').select('*');
    } catch (error) {
      throw new Error('Erro ao obter professores');
    }
  },

  // Deletar um professor
  delete: async (id) => {
    try {
      await db('teachers').where('id', id).del();
    } catch (error) {
      throw new Error('Erro ao deletar professor');
    }
  },
};

module.exports = Teacher;
