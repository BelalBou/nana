import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeBucket } from './config/minio';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuration CORS pour la production
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://devign-studio.be',
      'https://www.devign-studio.be'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Initialiser MinIO au démarrage
  await initializeBucket();
  
  await app.listen(4000);
  console.log('🚀 Application démarrée sur http://localhost:4000');
}
bootstrap();