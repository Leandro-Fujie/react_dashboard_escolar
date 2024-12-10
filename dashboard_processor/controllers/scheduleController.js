const Schedule = require('../models/schedule');
const Student = require('../models/student');  // Supondo que você tenha um modelo de Student
const Teacher = require('../models/teacher');  // Supondo que você tenha um modelo de Teacher

// Função para verificar se um aluno existe
const checkStudentExists = async (student_id) => {
  const student = await Student.findById(student_id);
  if (!student) {
    throw new Error('Aluno não encontrado');
  }
  return student;
};

// Função para verificar se um professor existe
const checkTeacherExists = async (teacher_id) => {
  const teacher = await Teacher.findById(teacher_id);
  if (!teacher) {
    throw new Error('Professor não encontrado');
  }
  return teacher;
};

// Criar um novo agendamento
exports.createSchedule = async (req, res) => {
  const { student_id, teacher_id, schedule_date, schedule_time, content } = req.body;

  // Verifica se todos os campos obrigatórios estão presentes
  if (!student_id || !teacher_id || !schedule_date || !schedule_time || !content) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  try {
    // Verificar se o aluno e o professor existem
    await checkStudentExists(student_id);
    await checkTeacherExists(teacher_id);

    // Criar o agendamento
    const newSchedule = await Schedule.create({ student_id, teacher_id, schedule_date, schedule_time, content });
    res.status(201).json(newSchedule);
  } catch (error) {
    console.error('Erro ao criar agendamento:', error.message);
    res.status(500).json({ error: error.message || 'Erro ao criar agendamento' });
  }
};

// Obter todos os agendamentos
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.getAll();
    res.status(200).json(schedules);
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error);
    res.status(500).json({ error: 'Erro ao listar agendamentos' });
  }
};

// Atualizar agendamento
exports.updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { status, content, schedule_time } = req.body;

  // Verifica se ao menos um dos campos foi passado
  if (!status && !content && !schedule_time) {
    return res.status(400).json({ error: 'Status, content ou schedule_time são obrigatórios' });
  }

  try {
    // Atualiza os dados do agendamento
    const updateData = {};
    if (status) updateData.status = status;
    if (content) updateData.content = content;
    if (schedule_time) updateData.schedule_time = schedule_time;

    const updatedSchedule = await Schedule.update(id, updateData);

    if (updatedSchedule) {
      res.status(200).json({ message: 'Agendamento atualizado com sucesso' });
    } else {
      res.status(404).json({ error: 'Agendamento não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    res.status(500).json({ error: 'Erro ao atualizar agendamento' });
  }
};

// Deletar agendamento
exports.deleteSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    await Schedule.delete(id);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error);
    res.status(500).json({ error: 'Erro ao deletar agendamento' });
  }
};
