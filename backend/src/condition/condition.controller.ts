import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ConditionService } from './condition.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('conditions')
export class ConditionController {
  constructor(private readonly conditionService: ConditionService) {}

  @Get()
  findAll(@Query('aidId') aidId?: string) {
    if (aidId) {
      return this.conditionService.findByAid(+aidId);
    }
    return this.conditionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conditionService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createConditionDto: {
    aidId: number;
    question: string;
    field: string;
    type: string;
    operator: string;
    value: string;
    order: number;
  }) {
    return this.conditionService.create(createConditionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConditionDto: {
      question?: string;
      field?: string;
      type?: string;
      operator?: string;
      value?: string;
      order?: number;
    },
  ) {
    return this.conditionService.update(+id, updateConditionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conditionService.remove(+id);
  }
} 