import type { z } from 'zod';
import type { createChangePasswordSchema } from '../schemas/change-password.schema';

export type IChangePasswordFields = z.infer<ReturnType<typeof createChangePasswordSchema>>;
