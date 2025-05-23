import { describe, it, expect } from 'vitest'
import { prisma } from '../lib/prisma/client'

describe('User Authentication Schema', () => {
  it('should create a user with required fields', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'hashedpassword123',
      }
    })

    expect(user).toBeTruthy()
    expect(user.email).toBe('test@example.com')
    expect(user.id).toBeTruthy()
  })

  it('should prevent duplicate email creation', async () => {
    const email = 'unique@example.com'
    
    await prisma.user.create({
      data: {
        email,
        password: 'hashedpassword123',
      }
    })

    await expect(
      prisma.user.create({
        data: {
          email,
          password: 'anotherpassword',
        }
      })
    ).rejects.toThrow()
  })

  it('should allow saving job to user', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'jobsaver@example.com',
        password: 'hashedpassword123',
      }
    })

    const savedJob = await prisma.savedJob.create({
      data: {
        userId: user.id,
        jobId: 'job123',
      }
    })

    expect(savedJob).toBeTruthy()
    expect(savedJob.userId).toBe(user.id)
  })
})