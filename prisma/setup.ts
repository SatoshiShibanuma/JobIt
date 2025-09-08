import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

beforeAll(() => {
  prisma = new PrismaClient()
})

afterAll(async () => {
  await prisma?.$disconnect()
})

export { prisma }