import { Injectable } from '@nestjs/common';
import { AidService } from '../aid/aid.service';

type UserAnswers = {
  [key: string]: string | number | boolean;
};

@Injectable()
export class EligibilityService {
  constructor(private readonly aidService: AidService) {}

  private checkCondition(condition: any, answers: UserAnswers): boolean {
    const { field, operator, value, type } = condition;
    const answer = answers[field];

    if (answer === undefined) return false;

    switch (type) {
      case 'number':
        const numAnswer = Number(answer);
        const numValue = Number(value);
        switch (operator) {
          case '>': return numAnswer > numValue;
          case '<': return numAnswer < numValue;
          case '>=': return numAnswer >= numValue;
          case '<=': return numAnswer <= numValue;
          case '==': return numAnswer === numValue;
          default: return false;
        }

      case 'boolean':
        const boolAnswer = Boolean(answer);
        const boolValue = value.toLowerCase() === 'true';
        return operator === '==' ? boolAnswer === boolValue : false;

      case 'select':
        if (Array.isArray(answer)) {
          return operator === 'includes' ? answer.includes(value) : false;
        }
        return operator === '==' ? answer === value : false;

      default:
        return false;
    }
  }

  async checkEligibility(answers: UserAnswers) {
    const aids = await this.aidService.findAll();
    
    return aids
      .filter(aid => aid.active)
      .filter(aid => {
        if (!aid.conditions || aid.conditions.length === 0) return true;
        return aid.conditions.every(condition => this.checkCondition(condition, answers));
      })
      .map(aid => ({
        title: aid.title,
        description: aid.description,
        link: aid.link,
        region: aid.region
      }));
  }
} 