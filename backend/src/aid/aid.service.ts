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
    // Normaliser la valeur de la région
    const normalizedRegion = this.normalizeRegion(data.region);
    
    return this.prisma.aid.create({
      data: {
        ...data,
        region: normalizedRegion,
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
    // Normaliser la valeur de la région si elle est fournie
    const normalizedData = {
      ...data,
      region: data.region ? this.normalizeRegion(data.region) : undefined,
    };

    const { conditions, ...aidData } = normalizedData as any;
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

  private normalizeRegion(region: string): string {
    const regionMap: { [key: string]: string } = {
      'France': 'france',
      'Bruxelles': 'belgique_bruxelles',
      'Flandre': 'belgique_flandre',
      'Wallonie': 'belgique_wallonie',
      'Bruxelles-Capitale': 'belgique_bruxelles',
    };

    return regionMap[region] || region;
  }
} 