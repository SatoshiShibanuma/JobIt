import { describe, it, expect } from 'vitest';
import { authOptions } from '../auth-options';

describe('Authentication Configuration', () => {
  it('should have a valid NextAuth configuration', () => {
    expect(authOptions).toBeDefined();
    expect(authOptions.providers).toBeTruthy();
    expect(authOptions.session?.strategy).toBe('jwt');
    expect(authOptions.secret).toBeTruthy();
  });

  it('should have credentials provider', () => {
    const credentialsProvider = authOptions.providers.find(
      provider => provider.name === 'Credentials'
    );
    expect(credentialsProvider).toBeTruthy();
  });
});