import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const specializations = [
      'Neurology',
      'Cardiology',
      'Dermatology',
      'Pediatrics',
      'Orthopedics',
      'Ophthalmology',
      'Gastroenterology',
      'Endocrinology',
      'Psychiatry',
      'Radiology',
      'General Surgery',
      'Internal Medicine'
];

async function main() {
      for (let i = 0; i < specializations.length; i++) {
            await prisma.category.upsert({
                  where: { id: i + 1 },  // نفترض الـ id يبدأ من 1
                  update: {},
                  create: {
                        id: i + 1,
                        name: specializations[i]
                  }
            });
      }
      console.log('Specializations inserted!');
}

main()
      .catch(e => {
            console.error(e);
            process.exit(1);
      })
      .finally(async () => {
            await prisma.$disconnect();
      });
