'use client';

import { Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useDeleteAccount } from '@/features/landing-page/lib/hooks/use-delete-account.hook';
import { useModal } from '@/shared/hooks';
import { Button } from '@/shared/ui/button';

export default function DeleteAccountButton() {
  // Translation
  const t = useTranslations('accountSettings.profile');

  // Hooks
  const { openModal, closeModal } = useModal();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount(() => {
    closeModal();
  });

  // Functions
  const openDeleteAccountModal = (pending: boolean) => {
    openModal({
      title: t('deleteAccountModal.title'),
      subtitle: t('deleteAccountModal.subtitle'),
      icon: <Trash className="size-5" strokeWidth={1.8} />,
      children: (
        <>
          <Button
            type="button"
            variant="outline"
            className="h-11! rounded-md"
            disabled={pending}
            onClick={closeModal}
          >
            {t('deleteAccountModal.cancel')}
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="h-11! rounded-md"
            loading={pending}
            onClick={() => {
              openDeleteAccountModal(true);
              deleteAccount(undefined, {
                onError: () => openDeleteAccountModal(false),
              });
            }}
          >
            {t('deleteAccountModal.confirm')}
          </Button>
        </>
      ),
    });
  };

  return (
    <button
      type="button"
      onClick={() => openDeleteAccountModal(isDeleting)}
      className="text-ds-danger hover:text-ds-danger-saturated cursor-pointer text-sm font-medium"
    >
      {t('deleteAccount')}
    </button>
  );
}
