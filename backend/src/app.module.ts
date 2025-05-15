import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AidModule } from './aid/aid.module';
import { ConditionModule } from './condition/condition.module';

@Module({
  imports: [AidModule, ConditionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 