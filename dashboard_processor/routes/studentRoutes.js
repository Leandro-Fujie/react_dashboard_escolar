const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();

// Rotas para estudantes
router.get('/', studentController.getAllStudents); // Listar estudantes
router.post('/', studentController.addStudent); // Criar estudante
router.put('/:id', studentController.updateStudent); // Atualizar estudante
router.delete('/:id', studentController.deleteStudent); // Deletar estudante

module.exports = router;
