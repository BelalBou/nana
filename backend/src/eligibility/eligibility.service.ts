import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Aid } from 'generated/prisma';

interface EligibilityStep {
  question: any;
  remainingAids: number;
}

@Injectable()
export class EligibilityService {
  constructor(private prisma: PrismaService) {}

  async getNextQuestion(answers: Record<string, any> = {}) {
    // 1. Récupérer toutes les aides actives
    const aids = await this.getEligibleAidsByRegion(answers.region);
    
    if (aids.length === 0) {
      return null;
    }

    // 2. Filtrer les aides encore éligibles avec les réponses actuelles
    const stillEligibleAids = aids.filter(aid => 
      this.isAidStillEligible(aid, answers)
    );

    if (stillEligibleAids.length === 0) {
      return null;
    }

    // 3. Trouver la prochaine question non répondue
    const nextQuestion = await this.findNextQuestion(stillEligibleAids, answers);

    if (!nextQuestion) {
      return null;
    }

    return {
      question: nextQuestion,
      remainingAids: stillEligibleAids.length
    };
  }

  private async getEligibleAidsByRegion(region?: string) {
    return this.prisma.aid.findMany({
      where: {
        active: true,
        ...(region && { region })
      },
      include: {
        conditions: {
          include: {
            question: true
          }
        }
      }
    });
  }

  private isAidStillEligible(aid: any, answers: Record<string, any>): boolean {
    return aid.conditions.every(condition => {
      const answer = answers[condition.question.field];
      
      // Si pas de réponse pour cette condition, l'aide est encore possible
      if (answer === undefined) {
        return true;
      }

      return this.checkCondition(condition, answer);
    });
  }

  private async findNextQuestion(aids: any[], answers: Record<string, any>) {
    // Récupérer toutes les questions non encore répondues
    const answeredFields = Object.keys(answers);
    
    const unansweredQuestions = await this.prisma.question.findMany({
      where: {
        field: {
          notIn: answeredFields
        },
        conditions: {
          some: {
            aidId: {
              in: aids.map(aid => aid.id)
            }
          }
        }
      },
      orderBy: { order: 'asc' }
    });

    // Retourner la première question par ordre de priorité
    return unansweredQuestions[0] || null;
  }

  private checkCondition(condition: any, answer: any): boolean {
    const { operator, value } = condition;
    
    switch (operator) {
      case 'between':
        const [min, max] = value.split(',').map(Number);
        const numAnswer = Number(answer);
        return numAnswer >= min && numAnswer <= max;
        
      case 'equals':
        return String(answer) === String(value);
        
      case 'greater_than':
        return Number(answer) > Number(value);
        
      case 'less_than':
        return Number(answer) < Number(value);
        
      case 'in':
        const allowedValues = value.split(',');
        return allowedValues.includes(String(answer));
        
      case 'not_in':
        const forbiddenValues = value.split(',');
        return !forbiddenValues.includes(String(answer));
        
      default:
        return false;
    }
  }

  async getFinalResults(answers: Record<string, any>) {
    const aids = await this.getEligibleAidsByRegion(answers.region);
    
    return aids.filter(aid => 
      aid.conditions.every(condition => 
        this.checkCondition(condition, answers[condition.question.field])
      )
    ).map(aid => ({
      id: aid.id,
      title: aid.title,
      description: aid.description,
      link: aid.link,
      region: aid.region
    }));
  }

  async getResults(answers: Record<string, any>): Promise<Aid[]> {
    const eligibleAids = await this.prisma.aid.findMany({
      where: { active: true },
      include: {
        conditions: {
          include: {
            question: true,
          },
        },
      },
    });

    const results = eligibleAids.filter(aid => this.isAidStillEligible(aid, answers));
    
    console.log('🎯 Résultats finaux avec images:', results.map(aid => ({
      id: aid.id,
      title: aid.title,
      imagesCount: aid.images?.length || 0,
      images: aid.images || []
    })));
    
    return results;
  }

  // Méthode de compatibilité avec l'ancien système
  async checkEligibility(answers: any) {
    const userAnswers = answers.answers || answers;
    return this.getFinalResults(userAnswers);
  }
}