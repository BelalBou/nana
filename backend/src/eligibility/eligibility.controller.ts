import { Controller, Post, Body, Get, Param } from '@nestjs/common';
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
  async getResults(@Body() body: { answers: Record<string, any> }) {
    const results = await this.eligibilityService.getResults(body.answers);
    
    console.log('📤 Envoi des résultats au frontend:', results.map(aid => ({
      id: aid.id,
      title: aid.title,
      imagesCount: aid.images?.length || 0,
      hasImages: !!aid.images && aid.images.length > 0
    })));
    
    return results;
  }

  @Get(':id')
  async getAidById(@Param('id') id: string) {
    return this.eligibilityService.getAidById(Number(id));
  }
}