import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AidModule } from './aid/aid.module';
import { ConditionModule } from './condition/condition.module';
import { EligibilityModule } from './eligibility/eligibility.module';

@Module({
  imports: [AidModule, ConditionModule, EligibilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 