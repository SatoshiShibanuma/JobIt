import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

beforeAll(async () => {
  // Optional: Run migrations or seed data
  await prisma.$connect()
})

afterAll(async () => {
  await prisma.$disconnect()
})