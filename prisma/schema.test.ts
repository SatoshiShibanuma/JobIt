import { PrismaClient } from '@prisma/client'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { setupTests, teardownTests } from './setup'

describe('User Authentication Database Schema', () => {
  let prisma: PrismaClient

  beforeAll(async () => {
    await setupTests()
    prisma = new PrismaClient()
  })

  afterAll(async () => {
    await teardownTests()
  })

  it('should create a user with valid data', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash: 'hashedpassword123',
        name: 'Test User'
      }
    })

    expect(user).toBeDefined()
    expect(user.email).toBe('test@example.com')
    expect(user.name).toBe('Test User')
  })

  it('should prevent duplicate email addresses', async () => {
    await prisma.user.create({
      data: {
        email: 'unique@example.com',
        passwordHash: 'hashedpassword123'
      }
    })

    await expect(
      prisma.user.create({
        data: {
          email: 'unique@example.com',
          passwordHash: 'anotherhashedpassword'
        }
      })
    ).rejects.toThrow()
  })

  it('should create a saved job for a user', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'savedjobtester@example.com',
        passwordHash: 'hashedpassword123'
      }
    })

    const savedJob = await prisma.savedJob.create({
      data: {
        userId: user.id,
        jobId: 'job123'
      }
    })

    expect(savedJob).toBeDefined()
    expect(savedJob.userId).toBe(user.id)
  })
})