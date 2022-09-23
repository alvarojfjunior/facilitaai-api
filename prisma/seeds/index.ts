import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

const companies: Prisma.CompanyCreateInput[] = [
  {
    name: 'Facilitaai',
    slogan: 'Facilitar o seu negócio é o nosso negócio',
    color: '#fff',
    whatsapp: '553891611042',
    fone: '553891611042',
  },
];

const accessProfiles: Prisma.AccessProfileCreateInput[] = [
  {
    name: 'admin',
    allowed: [
      {
        name: 'user',
        see: true,
        create: true,
        edit: true,
        delete: true,
      },
      {
        name: 'company',
        see: true,
        create: true,
        edit: true,
        delete: true,
      },
      {
        name: 'accessProfile',
        see: true,
        create: true,
        edit: true,
        delete: true,
      },
      {
        name: 'product',
        see: true,
        create: true,
        edit: true,
        delete: true,
      },
      {
        name: 'client',
        see: true,
        create: true,
        edit: true,
        delete: true,
      },
      {
        name: 'sale',
        see: true,
        create: true,
        edit: true,
        delete: true,
      },
      {
        name: 'dossier',
        see: true,
        create: true,
        edit: false,
        delete: false,
      },
    ],
  },
];

const users: Prisma.UserCreateInput[] = [
  {
    email: 'teste@teste.com',
    name: 'Teste',
    password:
      'ae8fb6dc49b8d11f:676e5b99fd3760d88ba5be1cb92fa1cce6f8080cb616dd5baaf09b2e9a4abb5298e6d2aa86a9f7e9c2c6dfebcc3ed2e87b869f99a7a43fa7b7e69ef8ead3c68c',
    Company: {
      connect: {
        id: 1,
      },
    },
    AccessProfile: {
      connect: {
        id: 1,
      },
    },
  },
];



async function main() {
  for (const data of companies) {
    try {
      await prisma.company.create({
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  for (const data of accessProfiles) {
    try {
      await prisma.accessProfile.create({
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  for (const data of users) {
    try {
      await prisma.user.create({
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error to run seed: ', e);
    await prisma.$disconnect();
    process.exit(1);
  });
