import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from 'better-auth';
import { authConfig } from './config';

export async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const decoded = await verifyToken(token, authConfig.secret);
    
    // Optional: Additional checks can be added here
    if (!decoded) {
      throw new Error('Invalid token');
    }

    return NextResponse.next();
  } catch (error) {
    // Token verification failed
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export function protectedRoutes(req: NextRequest) {
  const publicPaths = ['/login', '/register', '/'];
  const path = req.nextUrl.pathname;

  const isPublicPath = publicPaths.includes(path);
  const token = req.cookies.get('auth_token')?.value;

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}