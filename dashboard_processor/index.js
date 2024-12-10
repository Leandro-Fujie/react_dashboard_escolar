// backend/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const studentRoutes = require('./routes/studentRoutes'); // Importar rotas
const teacherRoutes = require('./routes/teacherRoutes'); // Importar rotas de professores
const scheduleRoutes = require('./routes/scheduleRoutes'); // Importar rotas de agendamentos

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// Configurar o CORS para aceitar requisições do frontend
app.use(cors());
app.use(express.json()); // Para lidar com JSON no corpo das requisições

// Usar as rotas de estudantes
app.use('/students', studentRoutes);

// Usar as rotas de professores
app.use('/teachers', teacherRoutes);

// Usar as rotas de agendamentos
app.use('/schedules', scheduleRoutes);

// Defina a porta de escuta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
