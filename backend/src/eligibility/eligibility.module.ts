import { Module } from '@nestjs/common';
import { EligibilityController } from './eligibility.controller';
import { EligibilityService } from './eligibility.service';
import { AidModule } from '../aid/aid.module';

@Module({
  imports: [AidModule],
  controllers: [EligibilityController],
  providers: [EligibilityService],
})
export class EligibilityModule {} 