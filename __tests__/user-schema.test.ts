import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { PrismaClient } from '@prisma/client'

describe('User Authentication Schema', () => {
  let prisma: PrismaClient

  beforeAll(() => {
    prisma = new PrismaClient()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should create a user with required fields', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password_hash: 'hashedpassword123',
      }
    })

    expect(user).toBeTruthy()
    expect(user.email).toBe('test@example.com')
    expect(user.id).toBeTruthy()
    expect(user.created_at).toBeTruthy()
    expect(user.updated_at).toBeTruthy()
  })

  it('should prevent duplicate email creation', async () => {
    const email = 'unique@example.com'
    
    await prisma.user.create({
      data: {
        email,
        password_hash: 'hashedpassword123',
      }
    })

    await expect(
      prisma.user.create({
        data: {
          email,
          password_hash: 'anotherpassword',
        }
      })
    ).rejects.toThrow()
  })

  it('should allow saving job to user', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'jobsaver@example.com',
        password_hash: 'hashedpassword123',
      }
    })

    const savedJob = await prisma.savedJob.create({
      data: {
        user_id: user.id,
        job_id: 'job123',
      }
    })

    expect(savedJob).toBeTruthy()
    expect(savedJob.user_id).toBe(user.id)
  })
})