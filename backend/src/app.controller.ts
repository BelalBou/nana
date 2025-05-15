import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '../generated/prisma';

@Controller()
export class AppController {
  private prisma: PrismaClient;

  constructor(private readonly appService: AppService) {
    this.prisma = new PrismaClient();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-db')
  async testDatabase() {
    try {
      // Test simple de connexion
      await this.prisma.$connect();
      return { status: 'success', message: '✅ Connexion à la base de données réussie !' };
    } catch (error) {
      return { status: 'error', message: '❌ Erreur de connexion à la base de données', error: error.message };
    } finally {
      await this.prisma.$disconnect();
    }
  }
} 