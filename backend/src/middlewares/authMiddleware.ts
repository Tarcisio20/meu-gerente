// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  userId?: string;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  // TODO: pegar token do header Authorization, validar JWT e preencher userId

  // Exemplo MOCK: depois você troca pelo JWT de verdade
  // const token = req.headers.authorization?.replace('Bearer ', '');
  // const payload = verify(token, JWT_SECRET) as { userId: string };
  // req.userId = payload.userId;

  req.userId = 'mock-user-id'; // <--- remover isso depois
  next();
}
