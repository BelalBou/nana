import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AidService } from './aid.service';

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

  @Post()
  create(@Body() createAidDto: {
    title: string;
    description: string;
    region: string;
    link: string;
    conditions?: { description: string }[];
  }) {
    return this.aidService.create(createAidDto);
  }

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aidService.remove(+id);
  }
} 