import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function hashPassword(password: string, saltRounds: number): Promise<string> {
  return hash(password, saltRounds);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

export async function generateToken(payload: any, secret: string, expiresIn: string): Promise<string> {
  return jwt.sign(payload, secret, { expiresIn });
}

export async function verifyToken(token: string, secret: string): Promise<any> {
  return jwt.verify(token, secret);
}