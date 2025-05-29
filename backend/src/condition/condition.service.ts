import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConditionService {
  constructor(private prisma: PrismaService) {}

  async create(createConditionDto: {
    aidId: number;
    questionId: number;
    operator: string;
    value: string;
  }) {
    return this.prisma.condition.create({
      data: createConditionDto,
      include: {
        question: true,
        aid: true,
      },
    });
  }

  async findAll() {
    return this.prisma.condition.findMany({
      include: {
        question: true,
        aid: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.condition.findUnique({
      where: { id },
      include: {
        question: true,
        aid: true,
      },
    });
  }

  async update(
    id: number,
    updateConditionDto: {
      aidId?: number;
      questionId?: number;
      operator?: string;
      value?: string;
    },
  ) {
    return this.prisma.condition.update({
      where: { id },
      data: updateConditionDto,
      include: {
        question: true,
        aid: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.condition.delete({
      where: { id },
    });
  }

  async findByAid(aidId: number) {
    return this.prisma.condition.findMany({
      where: { aidId },
      include: {
        question: true,
      },
    });
  }
}