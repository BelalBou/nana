import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AidService } from './aid.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('aids')
export class AidController {
  constructor(private readonly aidService: AidService) {}

  @Get()
  findAll() {
    return this.aidService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aidService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAidDto: {
    title: string;
    description: string;
    region: string;
    link: string;
    conditions?: {
      question: string;
      field: string;
      type: string;
      operator: string;
      value: string;
      order: number;
    }[];
  }) {
    return this.aidService.create(createAidDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAidDto: {
      title?: string;
      description?: string;
      region?: string;
      link?: string;
      active?: boolean;
    },
  ) {
    return this.aidService.update(+id, updateAidDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aidService.remove(+id);
  }
} 