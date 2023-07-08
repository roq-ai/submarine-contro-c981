import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { submarineValidationSchema } from 'validationSchema/submarines';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.submarine
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSubmarineById();
    case 'PUT':
      return updateSubmarineById();
    case 'DELETE':
      return deleteSubmarineById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSubmarineById() {
    const data = await prisma.submarine.findFirst(convertQueryToPrismaUtil(req.query, 'submarine'));
    return res.status(200).json(data);
  }

  async function updateSubmarineById() {
    await submarineValidationSchema.validate(req.body);
    const data = await prisma.submarine.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSubmarineById() {
    const data = await prisma.submarine.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
