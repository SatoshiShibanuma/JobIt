import { PrismaClient } from '@prisma/client'

export async function setupTests() {
  const prisma = new PrismaClient()
  await prisma.$connect()
  return prisma
}

export async function teardownTests(prisma: PrismaClient) {
  await prisma.$disconnect()
}