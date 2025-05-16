import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AidService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.aid.findMany({
      include: {
        conditions: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.aid.findUnique({
      where: { id },
      include: {
        conditions: true,
      },
    });
  }

  async create(data: {
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
    return this.prisma.aid.create({
      data: {
        ...data,
        conditions: {
          create: data.conditions,
        },
      },
      include: {
        conditions: true,
      },
    });
  }

  async update(id: number, data: {
    title?: string;
    description?: string;
    region?: string;
    link?: string;
    active?: boolean;
  }) {
    // On ne met à jour que les champs de l'aide, pas les conditions
    const { conditions, ...aidData } = data as any;
    return this.prisma.aid.update({
      where: { id },
      data: aidData,
      include: {
        conditions: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.aid.delete({
      where: { id },
    });
  }
} 