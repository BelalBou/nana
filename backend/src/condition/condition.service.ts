import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConditionService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.condition.findMany({
      include: {
        aid: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.condition.findUnique({
      where: { id },
      include: {
        aid: true,
      },
    });
  }

  async findByAid(aidId: number) {
    return this.prisma.condition.findMany({
      where: { aidId },
      orderBy: { order: 'asc' },
    });
  }

  async create(data: {
    aidId: number;
    question: string;
    field: string;
    type: string;
    operator: string;
    value: string;
    order: number;
  }) {
    return this.prisma.condition.create({
      data,
      include: {
        aid: true,
      },
    });
  }

  async update(id: number, data: {
    question?: string;
    field?: string;
    type?: string;
    operator?: string;
    value?: string;
    order?: number;
  }) {
    return this.prisma.condition.update({
      where: { id },
      data,
      include: {
        aid: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.condition.delete({
      where: { id },
    });
  }
} 