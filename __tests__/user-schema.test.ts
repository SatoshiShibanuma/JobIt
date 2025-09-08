import { describe, it, expect } from 'vitest'
import prisma from '../lib/prisma'

describe('User Authentication Schema', () => {
  it('should create a user with valid data', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'hashedpassword123',
        name: 'Test User'
      }
    })

    expect(user).toBeDefined()
    expect(user.email).toBe('test@example.com')
    expect(user.role).toBe('USER')
    expect(user.status).toBe('ACTIVE')
  })

  it('should not allow duplicate email addresses', async () => {
    await prisma.user.create({
      data: {
        email: 'unique@example.com',
        password: 'hashedpassword123'
      }
    })

    await expect(prisma.user.create({
      data: {
        email: 'unique@example.com',
        password: 'anotherpassword'
      }
    })).rejects.toThrow()
  })

  it('should create a saved job for a user', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'saveduser@example.com',
        password: 'hashedpassword123'
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