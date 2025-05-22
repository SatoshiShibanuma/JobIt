import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export async function setupTests() {
  await prisma.$connect()
}

export async function teardownTests() {
  await prisma.$disconnect()
}