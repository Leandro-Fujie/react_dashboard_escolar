const express = require('express');
const teacherController = require('../controllers/teacherController');

const router = express.Router();

// Rota para listar todos os professores
router.get('/', teacherController.getAllTeachers);

// Rota para criar um novo professor
router.post('/', teacherController.addTeacher);

// Rota para atualizar um professor
router.put('/:id', teacherController.updateTeacher);

// Rota para deletar um professor
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;
