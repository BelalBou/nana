import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AidsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    title: string;
    description: string;
    region: string;
    link: string;
    active: boolean;
  }) {
    return this.prisma.aid.create({
      data,
    });
  }

  async findAll() {
    const aids = await this.prisma.aid.findMany({
      orderBy: { id: 'desc' },
    });
    
    console.log('🗃️ Aides récupérées avec images:', aids.map(aid => ({
      id: aid.id,
      title: aid.title,
      imagesCount: aid.images?.length || 0,
      images: aid.images || []
    })));
    
    return aids;
  }

  async findOne(id: number) {
    return this.prisma.aid.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    data: {
      title?: string;
      description?: string;
      region?: string;
      link?: string;
      active?: boolean;
    },
  ) {
    return this.prisma.aid.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.aid.delete({
      where: { id },
    });
  }
}