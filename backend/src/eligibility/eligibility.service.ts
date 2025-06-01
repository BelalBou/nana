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
    console.log('🔍 getResults appelée avec les réponses:', answers);
    
    const aids = await this.getEligibleAidsByRegion(answers.region);
    console.log('🗃️ Aides récupérées pour la région:', aids.length);

    // Utiliser la même logique stricte que getFinalResults
    const results = aids.filter(aid => 
      aid.conditions.every(condition => {
        const answer = answers[condition.question.field];
        
        // Si pas de réponse pour cette condition ET qu'on est à la fin du questionnaire,
        // alors l'aide n'est PAS éligible (logique stricte)
        if (answer === undefined) {
          console.log(`❌ Aide "${aid.title}" exclue : pas de réponse pour ${condition.question.field}`);
          return false;
        }

        const isValid = this.checkCondition(condition, answer);
        if (!isValid) {
          console.log(`❌ Aide "${aid.title}" exclue : condition non remplie pour ${condition.question.field} (${answer} vs ${condition.value})`);
        }
        return isValid;
      })
    );

    console.log('🎯 Résultats finaux filtrés:', results.map(aid => ({
      id: aid.id,
      title: aid.title,
      imagesCount: aid.images?.length || 0
    })));
    
    return results;
  }

  // Méthode de compatibilité avec l'ancien système
  async checkEligibility(answers: any) {
    const userAnswers = answers.answers || answers;
    return this.getFinalResults(userAnswers);
  }

  // Nouvelle méthode pour récupérer une aide spécifique avec toutes ses données
  async getAidById(id: number) {
    const aid = await this.prisma.aid.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        link: true,
        region: true,
        images: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        conditions: {
          include: {
            question: true,
          },
        },
      },
    });

    if (!aid) {
      throw new Error(`Aide avec l'ID ${id} non trouvée`);
    }

    console.log(`🔍 Aide récupérée (ID: ${id}):`, {
      title: aid.title,
      imagesCount: aid.images?.length || 0,
      images: aid.images
    });

    return aid;
  }
}