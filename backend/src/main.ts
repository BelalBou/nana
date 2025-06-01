import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeBucket } from './config/minio';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuration CORS
  app.enableCors({
    origin: true, // Accepte toutes les origines en développement
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Initialiser MinIO au démarrage
  await initializeBucket();
  
  await app.listen(4000);
  console.log('🚀 Application démarrée sur http://localhost:4000');
}
bootstrap();