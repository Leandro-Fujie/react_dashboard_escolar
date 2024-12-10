// controllers/studentController.js
const Student = require('../models/student');

// Obter todos os estudantes
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.getAll();
    res.json(students);
  } catch (error) {
    console.error('Erro ao listar estudantes:', error);
    res.status(500).json({ error: 'Erro ao listar estudantes' });
  }
};

// Adicionar um novo estudante
exports.addStudent = async (req, res) => {
  const {
    cpf,
    name,
    surname,
    whatsapp,
    birth_date,
    email,
    phone,
    cep,
    address, // Agora recebe os campos individuais separadamente
    houseNumber,
    neighborhood,
    state,
    city
  } = req.body;

  // Verifica se todos os campos obrigatórios estão presentes
  if (!cpf || !name || !surname || !address || !houseNumber || !neighborhood || !state || !city || !cep || !whatsapp) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  // Criação do estudante com todos os campos separados, sem agrupar nada
  try {
    const newStudent = await Student.create({
      cpf,
      name,
      surname,
      whatsapp,
      birth_date,
      email,
      phone,
      cep,
      address, // Agora passa os campos separadamente (não agrupados)
      houseNumber,
      neighborhood,
      state,
      city,
      contacts: { phone, whatsapp, email } // Passa contatos separadamente
    });

    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Erro ao criar estudante:', error);
    res.status(500).json({ error: 'Erro ao criar estudante' });
  }
};

// Atualizar um estudante
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    surname,
    whatsapp,
    birth_date,
    email,
    phone,
    cep,
    address, // Agora recebe os campos separados
    houseNumber,
    neighborhood,
    state,
    city
  } = req.body;

  try {
    // Atualiza o estudante com todos os campos, sem agrupar nada
    const updatedStudent = await Student.update(id, {
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

    if (updatedStudent) {
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ error: 'Estudante não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar estudante:', error);
    res.status(500).json({ error: 'Erro ao atualizar estudante' });
  }
};

// Deletar um estudante
exports.deleteStudent = async (req, res) => {
  const { id } = req.params; // O id vem da URL
  try {
    await Student.deleteStudent(id); // Chamada para a função corrigida
    res.status(204).send(); // Sem conteúdo
  } catch (error) {
    console.error('Erro ao deletar estudante:', error);
    res.status(500).json({ error: 'Erro ao deletar estudante' });
  }
};
