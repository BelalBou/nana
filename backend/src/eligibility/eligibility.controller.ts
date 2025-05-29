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

  @Post('next-question')
  async getNextQuestion(@Body() body: { answers: Record<string, any> }) {
    return this.eligibilityService.getNextQuestion(body.answers);
  }

  @Post('results')
  async getFinalResults(@Body() body: { answers: Record<string, any> }) {
    return this.eligibilityService.getFinalResults(body.answers);
  }
}