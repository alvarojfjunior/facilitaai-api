/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addDossier = async (
  companyId: number,
  userId: number,
  actionType: string,
  description: string,
  identifier: number
) => {
  try {
    const res = await prisma.dossier.create({
      data: {
        companyId: companyId,
        userId: userId,
        actionType: actionType,
        description: description,
        identifier: identifier,
      },
    });
    return res[0];
  } catch (error: any) {
    console.log('Erro to create a dossier');
    return error;
  }
};
