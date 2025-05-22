import { JwtPayload } from 'jsonwebtoken';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterUserInput extends UserCredentials {
  name?: string;
}

export interface AuthTokenPayload extends JwtPayload {
  userId: string;
  email: string;
}

export interface AuthResult {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}