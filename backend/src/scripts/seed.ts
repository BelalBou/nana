import { PrismaClient } from '../../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // 0. Créer l'admin nana
  const hashedPassword = await bcrypt.hash('123456', 10);
  const admin = await prisma.adminUser.create({
    data: {
      email: 'nastassia_dmrtds@outlook.com',
      password: hashedPassword,
    }
  });
  console.log('👤 Admin "nana" créé avec le mot de passe "123456"');

  // 1. Créer les questions réutilisables
  const ageQuestion = await prisma.question.create({
    data: {
      text: "Quel est votre âge ?",
      field: "age",
      type: "number",
      order: 1
    }
  });

  const regionQuestion = await prisma.question.create({
    data: {
      text: "Dans quelle région habitez-vous ?",
      field: "region",
      type: "select",
      options: JSON.stringify(["France", "Flandre", "Wallonie", "Bruxelles"]),
      order: 2
    }
  });

  const revenuQuestion = await prisma.question.create({
    data: {
      text: "Quel est votre revenu annuel ?",
      field: "revenu",
      type: "number",
      order: 3
    }
  });

  const firstTimeQuestion = await prisma.question.create({
    data: {
      text: "Êtes-vous primo-accédant ?",
      field: "primo_accedant",
      type: "boolean",
      order: 4
    }
  });

  // 2. Créer des aides avec leurs conditions
  const primeJeune = await prisma.aid.create({
    data: {
      title: "Prime Jeune Accédant",
      description: "Aide pour les jeunes de 18 à 35 ans primo-accédants",
      region: "France",
      link: "https://example.com/prime-jeune",
      conditions: {
        create: [
          {
            questionId: ageQuestion.id,
            operator: "between",
            value: "18,35"
          },
          {
            questionId: firstTimeQuestion.id,
            operator: "equals",
            value: "true"
          }
        ]
      }
    }
  });

  const aideRevenu = await prisma.aid.create({
    data: {
      title: "Aide aux Revenus Modestes",
      description: "Aide pour les personnes avec revenus inférieurs à 30000€",
      region: "France",
      link: "https://example.com/aide-revenu",
      conditions: {
        create: [
          {
            questionId: revenuQuestion.id,
            operator: "less_than",
            value: "30000"
          }
        ]
      }
    }
  });

  const aideBelgique = await prisma.aid.create({
    data: {
      title: "Aide Logement Belgique",
      description: "Aide spécifique pour les résidents belges",
      region: "Belgique",
      link: "https://example.com/aide-belgique",
      conditions: {
        create: [
          {
            questionId: regionQuestion.id,
            operator: "equals",
            value: "Belgique"
          }
        ]
      }
    }
  });

  // 3. Aides spécifiques par région avec plus de variété

  // FRANCE - Aides variées
  const ptzFrance = await prisma.aid.create({
    data: {
      title: "Prêt à Taux Zéro (PTZ)",
      description: "Prêt sans intérêt pour l'achat d'un premier logement en France",
      region: "France", 
      link: "https://www.service-public.fr/particuliers/vosdroits/F10871",
      conditions: {
        create: [
          {
            questionId: firstTimeQuestion.id,
            operator: "equals",
            value: "true"
          },
          {
            questionId: revenuQuestion.id,
            operator: "less_than", 
            value: "37000"
          }
        ]
      }
    }
  });

  const aidePersonnesAgesFrance = await prisma.aid.create({
    data: {
      title: "Aide Logement Seniors France",
      description: "Aide spéciale pour les personnes de plus de 60 ans en France",
      region: "France",
      link: "https://www.aide-sociale.fr/aide-logement-personnes-agees/",
      conditions: {
        create: [
          {
            questionId: ageQuestion.id,
            operator: "greater_than",
            value: "60"
          }
        ]
      }
    }
  });

  // FLANDRE - Aides spécifiques
  const aideFlandreJeunes = await prisma.aid.create({
    data: {
      title: "Vlaamse Woonlening",
      description: "Prêt logement flamand pour primo-accédants de moins de 35 ans", 
      region: "Flandre",
      link: "https://www.wonenvlaanderen.be/",
      conditions: {
        create: [
          {
            questionId: ageQuestion.id,
            operator: "between",
            value: "18,35"
          },
          {
            questionId: firstTimeQuestion.id,
            operator: "equals",
            value: "true"
          }
        ]
      }
    }
  });

  const aideFlandreRenovation = await prisma.aid.create({
    data: {
      title: "Vlaamse Renovatiepremie",
      description: "Prime flamande pour la rénovation de logements",
      region: "Flandre", 
      link: "https://www.vlaanderen.be/bouwen-wonen-en-energie/premies-voor-renovatie",
      conditions: {
        create: [
          {
            questionId: revenuQuestion.id,
            operator: "less_than",
            value: "45000"
          }
        ]
      }
    }
  });

  // WALLONIE - Aides spécifiques  
  const aideWallonieAccession = await prisma.aid.create({
    data: {
      title: "Prêt Tremplin Wallonie",
      description: "Prêt à taux réduit pour l'accession à la propriété en Wallonie",
      region: "Wallonie",
      link: "https://www.swcs.be/",
      conditions: {
        create: [
          {
            questionId: revenuQuestion.id,
            operator: "between", 
            value: "15000,40000"
          },
          {
            questionId: firstTimeQuestion.id,
            operator: "equals",
            value: "true"
          }
        ]
      }
    }
  });

  const aideWallonieFamille = await prisma.aid.create({
    data: {
      title: "Aide Logement Familles Nombreuses Wallonie",
      description: "Aide spéciale pour les familles avec enfants en Wallonie",
      region: "Wallonie",
      link: "https://www.wallonie.be/fr/acteurs-et-institutions/wallonie/spw-territoire-logement",
      conditions: {
        create: [
          {
            questionId: ageQuestion.id,
            operator: "between",
            value: "25,50"
          },
          {
            questionId: revenuQuestion.id,
            operator: "less_than",
            value: "35000"
          }
        ]
      }
    }
  });

  // BRUXELLES - Aides spécifiques
  const aideBruxellesPrimo = await prisma.aid.create({
    data: {
      title: "Prime à l'Acquisition Bruxelles",
      description: "Prime pour l'achat d'un premier logement à Bruxelles",
      region: "Bruxelles",
      link: "https://www.brussels.be/logement", 
      conditions: {
        create: [
          {
            questionId: firstTimeQuestion.id,
            operator: "equals",
            value: "true"
          },
          {
            questionId: revenuQuestion.id,
            operator: "less_than",
            value: "50000"
          }
        ]
      }
    }
  });

  const aideBruxellesJeunesActifs = await prisma.aid.create({
    data: {
      title: "Aide Jeunes Actifs Bruxelles", 
      description: "Aide pour les jeunes actifs de 25 à 40 ans à Bruxelles",
      region: "Bruxelles",
      link: "https://logement.brussels/",
      conditions: {
        create: [
          {
            questionId: ageQuestion.id,
            operator: "between",
            value: "25,40"
          },
          {
            questionId: revenuQuestion.id,
            operator: "between",
            value: "20000,60000"
          }
        ]
      }
    }
  });

  console.log('✅ Seeding terminé !');
  console.log(`📊 Questions créées: ${await prisma.question.count()}`);
  console.log(`🏠 Aides créées: ${await prisma.aid.count()}`);
  console.log(`⚙️ Conditions créées: ${await prisma.condition.count()}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });