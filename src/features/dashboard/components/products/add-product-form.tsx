'use client';

import { useId, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import { FieldLabel } from '@/shared/ui/field-label';
import { FileInput } from '@/shared/ui/file-input';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';

const MOCK_CATEGORY_KEYS = ['flowers', 'gifts', 'plants'] as const;
const MOCK_OCCASION_KEYS = ['birthday', 'wedding', 'anniversary'] as const;

export default function AddProductForm() {
  const t = useTranslations('dashboard.products');
  const descriptionId = useId();
  const categoryId = useId();
  const occasionId = useId();

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [galleryImage, setGalleryImage] = useState<File | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-ds-text-plain text-2xl font-semibold">{t('addTitle')}</h1>

      <div className="bg-ds-plain flex min-h-231.25 flex-col justify-between rounded-4xl p-6">
        <div className="flex w-full max-w-186.5 flex-col gap-4.5">
          <Input
            label={t('title')}
            required
            type="text"
            placeholder={t('titlePlaceholder')}
          />

          <div className="flex w-full flex-col gap-1.5">
            <FieldLabel htmlFor={descriptionId} required>
              {t('description')}
            </FieldLabel>
            <Textarea
              id={descriptionId}
              required
              placeholder={t('descriptionPlaceholder')}
              className="min-h-0 rounded-xl px-4 py-4 text-sm"
            />
          </div>

          <div className="flex w-full gap-2.5">
            <Input
              label={t('price')}
              required
              type="number"
              placeholder={t('pricePlaceholder')}
            />
            <Input
              label={t('discount')}
              type="number"
              placeholder={t('discountPlaceholder')}
            />
            <Input
              label={t('priceAfterDiscount')}
              type="number"
              disabled
              placeholder={t('priceAfterDiscountPlaceholder')}
            />
          </div>

          <Input
            label={t('quantity')}
            required
            type="number"
            placeholder={t('quantityPlaceholder')}
          />

          <div className="flex w-full gap-4.5">
            <FileInput
              label={t('coverImage')}
              required
              accept="image/*"
              value={coverImage}
              onChange={setCoverImage}
            />
            <FileInput
              label={t('gallery')}
              required
              accept="image/*"
              value={galleryImage}
              onChange={setGalleryImage}
            />
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <FieldLabel htmlFor={categoryId} required>
              {t('category')}
            </FieldLabel>
            <Select>
              <SelectTrigger id={categoryId} className="w-full">
                <SelectValue placeholder={t('selectPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {MOCK_CATEGORY_KEYS.map((key) => (
                  <SelectItem key={key} value={key}>
                    {t(`mockCategories.${key}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <FieldLabel htmlFor={occasionId} required>
              {t('occasion')}
            </FieldLabel>
            <Select>
              <SelectTrigger id={occasionId} className="w-full">
                <SelectValue placeholder={t('selectPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {MOCK_OCCASION_KEYS.map((key) => (
                  <SelectItem key={key} value={key}>
                    {t(`mockOccasions.${key}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="button" variant="primary" className="mt-6 w-full max-w-186.5">
          {t('addProduct')}
        </Button>
      </div>
    </div>
  );
}
