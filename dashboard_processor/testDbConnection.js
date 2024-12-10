const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

db.raw('SELECT 1+1 AS result')
  .then(() => {
    console.log('Conexão com o banco de dados PostgreSQL bem-sucedida!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error.message);
    process.exit(1);
  });
