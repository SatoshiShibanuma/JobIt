import { User, SavedJob, PasswordResetToken } from '@prisma/client'

// Omit sensitive fields when returning user data
export type SafeUser = Omit<User, 'password'>

export type UserWithSavedJobs = SafeUser & {
  savedJobs: SavedJob[]
}

export type PasswordResetRequest = Pick<PasswordResetToken, 'email' | 'token' | 'expiresAt'>