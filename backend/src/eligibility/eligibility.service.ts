import { Injectable } from '@nestjs/common';
import { AidService } from '../aid/aid.service';

interface Condition {
  id: number;
  question: string;
  field: string;
  type: string;
  operator: string;
  value: string;
  order: number;
}

type UserAnswers = {
  [key: string]: string | number | boolean;
};

@Injectable()
export class EligibilityService {
  constructor(private readonly aidService: AidService) {}

  private convertValue(value: string, type: string): any {
    console.log('Conversion de valeur:', { value, type });
    let result;
    switch (type) {
      case 'boolean':
        result = value.toLowerCase() === 'true';
        break;
      case 'number':
        result = Number(value);
        break;
      default:
        result = value;
    }
    console.log('Résultat de conversion:', result);
    return result;
  }

  private checkCondition(condition: Condition, answers: Record<string, any>): boolean {
    // Normaliser la casse du champ
    const normalizedField = condition.field.toLowerCase();
    const answer = answers[normalizedField] || answers[condition.field];
    
    if (answer === undefined) {
      console.log(`Champ ${condition.field} non trouvé dans les réponses`);
      return false;
    }

    console.log('Vérification condition:', {
      field: condition.field,
      rawAnswer: answer,
      rawValue: condition.value,
      operator: condition.operator,
      type: condition.type
    });

    const convertedAnswer = this.convertValue(String(answer), condition.type);
    const convertedValue = this.convertValue(condition.value, condition.type);

    console.log('Valeurs converties:', {
      field: condition.field,
      convertedAnswer,
      convertedValue,
      operator: condition.operator,
      type: condition.type
    });

    let result = false;
    // Normaliser l'opérateur
    const operator = condition.operator.toLowerCase().replace(/\s+/g, '');
    console.log('Opérateur normalisé:', operator);

    switch (operator) {
      case '==':
      case 'equals':
      case 'equal':
        result = convertedAnswer === convertedValue;
        console.log('Comparaison égalité:', { convertedAnswer, convertedValue, result });
        break;

      case '>':
      case 'greaterthan':
      case 'greater':
        result = Number(convertedAnswer) > Number(convertedValue);
        console.log('Comparaison supérieur:', { convertedAnswer, convertedValue, result });
        break;

      case '<':
      case 'lessthan':
      case 'less':
        result = Number(convertedAnswer) < Number(convertedValue);
        console.log('Comparaison inférieur:', { convertedAnswer, convertedValue, result });
        break;

      case '>=':
      case 'greaterthanorequal':
      case 'greaterorequal':
        result = Number(convertedAnswer) >= Number(convertedValue);
        console.log('Comparaison supérieur ou égal:', { convertedAnswer, convertedValue, result });
        break;

      case '<=':
      case 'lessthanorequal':
      case 'lessorequal':
        result = Number(convertedAnswer) <= Number(convertedValue);
        console.log('Comparaison inférieur ou égal:', { convertedAnswer, convertedValue, result });
        break;

      case '!=':
      case 'notequals':
      case 'notequal':
        result = convertedAnswer !== convertedValue;
        console.log('Comparaison différent:', { convertedAnswer, convertedValue, result });
        break;

      case 'between':
        if (condition.field.toLowerCase() === 'age') {
          const [minAge, maxAge] = condition.value.split(',').map(Number);
          const age = Number(convertedAnswer);
          result = age >= minAge && age <= maxAge;
          console.log('Comparaison entre:', { age, minAge, maxAge, result });
        }
        break;

      case 'includes':
      case 'contains':
        result = condition.value.split(',').includes(String(convertedAnswer));
        console.log('Vérification inclusion:', { 
          convertedAnswer, 
          possibleValues: condition.value.split(','), 
          result 
        });
        break;

      default:
        console.error('Opérateur non reconnu:', operator);
        return false;
    }

    console.log('Résultat final de la condition:', {
      field: condition.field,
      result,
      operator: condition.operator,
      normalizedOperator: operator
    });

    return result;
  }

  async checkEligibility(answers: any) {
    console.log('Vérification éligibilité avec les réponses:', answers);
    // Extraire les réponses de l'objet answers si nécessaire
    const userAnswers = answers.answers || answers;
    console.log('Réponses extraites:', userAnswers);

    const aids = await this.aidService.findAll();
    console.log('Aides disponibles:', JSON.stringify(aids, null, 2));
    
    const eligibleAids = aids
      .filter(aid => {
        const isActive = aid.active;
        console.log(`Aide ${aid.title} - Active: ${isActive}`);
        return isActive;
      })
      .filter(aid => {
        if (userAnswers.region && aid.region !== userAnswers.region) {
          console.log(`Aide ${aid.title} rejetée: région ne correspond pas (${aid.region} !== ${userAnswers.region})`);
          return false;
        }
        if (!aid.conditions || aid.conditions.length === 0) {
          console.log(`Aide ${aid.title} acceptée: pas de conditions`);
          return true;
        }
        console.log(`Vérification des conditions pour ${aid.title}:`, aid.conditions);
        const isEligible = aid.conditions.every(condition => this.checkCondition(condition, userAnswers));
        console.log(`Aide ${aid.title} ${isEligible ? 'acceptée' : 'rejetée'}: conditions`);
        return isEligible;
      })
      .map(aid => ({
        id: aid.id,
        title: aid.title,
        description: aid.description,
        link: aid.link,
        region: aid.region
      }));

    console.log('Aides éligibles:', JSON.stringify(eligibleAids, null, 2));
    return eligibleAids;
  }
} 