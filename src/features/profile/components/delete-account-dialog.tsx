'use client';

import { Trash2, X } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import { deleteAccountAction } from '@/features/profile/lib/actions/profile.actions';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog';
import { Button } from '@/shared/ui/button';

export default function DeleteAccountDialog() {
  const t = useTranslations('dashboard.profile');
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    setIsPending(true);
    try {
      await deleteAccountAction();
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('messages.error'));
      setIsPending(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button type="button" className="text-ds-danger cursor-pointer text-sm font-semibold" />
        }
      >
        {t('actions.deleteAccount')}
      </AlertDialogTrigger>

      <AlertDialogContent className="pt-10 pb-6 sm:max-w-md">
        <AlertDialogCancel
          variant="ghost"
          size="icon-sm"
          className="absolute end-3 top-3"
          disabled={isPending}
        >
          <X />
          <span className="sr-only">{t('deleteDialog.cancel')}</span>
        </AlertDialogCancel>

        <AlertDialogHeader className="flex flex-col place-items-center! items-center justify-center gap-2">
          <AlertDialogMedia className="bg-ds-muted mb-5 size-20 rounded-full">
            <span className="bg-ds-soft flex size-13 items-center justify-center rounded-full">
              <Trash2 className="size-6" />
            </span>
          </AlertDialogMedia>
          <AlertDialogTitle className="text-center text-lg font-semibold">
            {t('deleteDialog.title')}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-ds-danger text-center">
            {t('deleteDialog.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="-mx-6 mt-4 -mb-6 grid grid-cols-2 border-0 bg-transparent px-6">
          <AlertDialogCancel className="h-11!" variant="subtle" disabled={isPending}>
            {t('deleteDialog.cancel')}
          </AlertDialogCancel>
          <Button
            className="h-11!"
            variant="destructive"
            loading={isPending}
            onClick={handleDelete}
          >
            {t('deleteDialog.confirm')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
