import { User as PrismaUser } from '@prisma/client'

// Typescript interface for User model
export interface User extends PrismaUser {
  // Add any additional methods or computed properties if needed
}

// Type for creating a new user
export interface UserCreateInput {
  email: string
  password_hash: string
  name?: string
  profile_image?: string
}

// Type for updating user
export interface UserUpdateInput {
  name?: string
  profile_image?: string
  password_hash?: string
}

// Omit sensitive fields when returning user data
export type UserPublicData = Omit<User, 'password_hash'>