require('dotenv').config();

module.exports = {
  development: {
    client: 'pg', // Certifique-se de que o cliente é 'pg' para PostgreSQL
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: './migrations', // Onde as migrations serão armazenadas
    },
  },
};