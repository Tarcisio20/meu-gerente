// src/utils/auditLog.ts
import { prisma } from './prisma';
import { ActionType, EntityType } from '@prisma/client';

type LogParams = {
  userId?: string | null;
  entityType: EntityType;
  entityId?: string | null;
  action: ActionType;
  oldValues?: any;
  newValues?: any;
  metadata?: any;
};

export async function createAuditLog(params: LogParams) {
  const {
    userId = null,
    entityType,
    entityId = null,
    action,
    oldValues = null,
    newValues = null,
    metadata = null,
  } = params;

  await prisma.auditLog.create({
    data: {
      userId: userId ?? undefined,
      entityType,
      entityId: entityId ?? undefined,
      action,
      oldValues,
      newValues,
      metadata,
    },
  });
}
