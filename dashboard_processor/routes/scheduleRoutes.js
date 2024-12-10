// routes/scheduleRoutes.js
const express = require('express');
const scheduleController = require('../controllers/scheduleController');

const router = express.Router();

router.post('/', scheduleController.createSchedule);  // Criar agendamento
router.get('/', scheduleController.getAllSchedules);  // Listar agendamentos
router.put('/:id', scheduleController.updateSchedule);  // Atualizar agendamento
router.delete('/:id', scheduleController.deleteSchedule);  // Deletar agendamento

module.exports = router;
