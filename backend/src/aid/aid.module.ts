import { Module } from '@nestjs/common';
import { AidService } from './aid.service';
import { AidController } from './aid.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AidController],
  providers: [AidService, PrismaService],
  exports: [AidService],
})
export class AidModule {} 