import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.question.findMany({
      orderBy: { order: 'asc' },
      include: {
        conditions: true
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.question.findUnique({
      where: { id },
      include: {
        conditions: true
      }
    });
  }

  async create(data: {
    text: string;
    field: string;
    type: string;
    options?: string;
    order?: number;
  }) {
    return this.prisma.question.create({
      data
    });
  }

  async update(id: number, data: {
    text?: string;
    field?: string;
    type?: string;
    options?: string;
    order?: number;
  }) {
    return this.prisma.question.update({
      where: { id },
      data
    });
  }

  async remove(id: number) {
    return this.prisma.question.delete({
      where: { id }
    });
  }
}