import { Controller, Post, Body } from '@nestjs/common';
import { EligibilityService } from './eligibility.service';

@Controller('eligibility')
export class EligibilityController {
  constructor(private readonly eligibilityService: EligibilityService) {}

  @Post('check')
  async checkEligibility(@Body() answers: {
    [key: string]: string | number | boolean;
  }) {
    return this.eligibilityService.checkEligibility(answers);
  }
} 