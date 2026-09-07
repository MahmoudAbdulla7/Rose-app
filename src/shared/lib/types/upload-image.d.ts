import type { z } from 'zod';

import type { createImageSchema } from '../schemas/image.schema';

export type IUploadImagePayload = {
  url: string;
};

export type IImageUploadFields = z.infer<ReturnType<typeof createImageSchema>>;
