import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AidService {
  constructor(private prisma: PrismaService) {}

  async create(createAidDto: {
    title: string;
    description: string;
    region: string;
    link: string;
    active?: boolean;
  }) {
    return this.prisma.aid.create({
      data: createAidDto,
    });
  }

  async findAll() {
    return this.prisma.aid.findMany({
      include: {
        conditions: {
          include: {
            question: true
          }
        }
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.aid.findUnique({
      where: { id },
      include: {
        conditions: {
          include: {
            question: true
          }
        }
      }
    });
  }

  async update(id: number, updateAidDto: {
    title?: string;
    description?: string;
    region?: string;
    link?: string;
    active?: boolean;
  }) {
    return this.prisma.aid.update({
      where: { id },
      data: updateAidDto,
    });
  }

  async remove(id: number) {
    return this.prisma.aid.delete({
      where: { id },
    });
  }
}