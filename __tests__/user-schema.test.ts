import { PrismaClient } from '@prisma/client'

describe('User Authentication Database Schema', () => {
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
        password: 'hashedpassword123',
      },
    })

    expect(user).toBeDefined()
    expect(user.email).toBe('test@example.com')
    expect(user.createdAt).toBeTruthy()
    expect(user.updatedAt).toBeTruthy()
  })

  it('should prevent duplicate email addresses', async () => {
    const email = 'unique@example.com'

    await prisma.user.create({
      data: {
        email,
        password: 'hashedpassword123',
      },
    })

    await expect(
      prisma.user.create({
        data: {
          email,
          password: 'anotherpassword',
        },
      })
    ).rejects.toThrow()
  })

  it('should create a profile for a user', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'profile@example.com',
        password: 'hashedpassword123',
        profile: {
          create: {
            firstName: 'John',
            lastName: 'Doe',
            bio: 'Software Engineer',
          },
        },
      },
      include: {
        profile: true,
      },
    })

    expect(user.profile).toBeTruthy()
    expect(user.profile?.firstName).toBe('John')
  })

  it('should create a saved job for a user', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'jobs@example.com',
        password: 'hashedpassword123',
        savedJobs: {
          create: {
            jobId: 'job123',
            jobTitle: 'Software Developer',
            company: 'Tech Corp',
            jobUrl: 'https://example.com/jobs/123',
          },
        },
      },
      include: {
        savedJobs: true,
      },
    })

    expect(user.savedJobs).toHaveLength(1)
    expect(user.savedJobs[0].jobTitle).toBe('Software Developer')
  })
})