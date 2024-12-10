// controllers/teacherController.js
const Teacher = require('../models/teacher');

// Obter todos os professores
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.getAll();
    res.json(teachers);
  } catch (error) {
    console.error('Erro ao listar professores:', error);
    res.status(500).json({ error: 'Erro ao listar professores' });
  }
};


// Adicionar um novo professor
exports.addTeacher = async (req, res) => {
  const { cpf, name, surname, specialty, status } = req.body;

  // Verifica se todos os campos obrigatórios estão presentes
  if (!cpf || !name || !surname) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  try {
    // Verifica se o CPF já está cadastrado (se isso for necessário)
    const existingTeacher = await Teacher.getByCpf(cpf);
    if (existingTeacher) {
      return res.status(400).json({ error: 'CPF já cadastrado para outro professor' });
    }

    // Se o CPF não existir, cria um novo professor
    const result = await Teacher.create({ cpf, name, surname, specialty, status });

    const newTeacher = result[0]; // Aqui você está pegando o primeiro objeto retornado
    res.status(201).json(newTeacher);
  } catch (error) {
    console.error('Erro ao criar professor:', error);
    res.status(500).json({ error: 'Erro ao criar professor' });
  }
};


// Atualizar um professor
exports.updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { cpf, name, surname, specialty, status } = req.body;

  try {
    const updatedTeacher = await Teacher.update(id, { cpf, name, surname, specialty, status });
    if (updatedTeacher) {
      res.status(200).json(updatedTeacher);
    } else {
      res.status(404).json({ error: 'Professor não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar professor:', error);
    res.status(500).json({ error: 'Erro ao atualizar professor' });
  }
};

// Deletar um professor
exports.deleteTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTeacher = await Teacher.delete(id);
    if (deletedTeacher) {
      res.status(204).send(); // Sem conteúdo
    } else {
      res.status(404).json({ error: 'Professor não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao deletar professor:', error);
    res.status(500).json({ error: 'Erro ao deletar professor' });
  }
};
