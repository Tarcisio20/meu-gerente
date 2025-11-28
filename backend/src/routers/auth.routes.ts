// src/routes/auth.routes.ts
import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { createAuditLog } from '../utils/auditLog';
import { ActionType, EntityType } from '@prisma/client';

const router = Router();

// POST /auth/register
router.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // TODO: validar inputs, checar se email já existe, fazer hash da senha
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: password, // TROCAR POR HASH!
      },
    });

    await createAuditLog({
      userId: user.id,
      entityType: EntityType.USER,
      entityId: user.id,
      action: ActionType.CREATE,
      newValues: user,
    });

    return res.status(201).json({ user });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
});

// POST /auth/login
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // TODO: comparar hash de senha
    if (user.passwordHash !== password) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // TODO: gerar JWT real
    const fakeToken = 'FAKE_JWT_TOKEN';

    await createAuditLog({
      userId: user.id,
      entityType: EntityType.AUTH,
      entityId: user.id,
      action: ActionType.LOGIN,
      metadata: { email },
    });

    return res.json({ token: fakeToken, user });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});

export default router;
