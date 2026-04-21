require('dotenv').config();
const app = require('./app');
const { testConnection } = require('./infrastructure/database/connection');

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`🚀 WritingCode API corriendo en http://localhost:${PORT}`);
    console.log(`📚 Ambiente: ${process.env.NODE_ENV}`);
  });
}

bootstrap();
