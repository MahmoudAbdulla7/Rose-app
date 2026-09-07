import * as z from 'zod';

import {
  IMAGE_ALLOWED_TYPES,
  IMAGE_MAX_BYTES,
} from '@/shared/lib/constants/image.constant';

type IValidationTranslator = (key: string) => string;

export const createImageSchema = (t: IValidationTranslator) =>
  z.object({
    image: z
      .instanceof(File, { message: t('avatarInvalidType') })
      .refine(
        (file) => IMAGE_ALLOWED_TYPES.includes(file.type as (typeof IMAGE_ALLOWED_TYPES)[number]),
        t('avatarInvalidType'),
      )
      .refine((file) => file.size <= IMAGE_MAX_BYTES, t('avatarTooLarge'))
      .optional(),
  });
