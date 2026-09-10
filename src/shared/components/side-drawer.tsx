'use client';

import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';

export type SideDrawerProps = {
  title: string;
  trigger: ReactNode;
  triggerClassName?: string;
  children: ReactNode;
  footer?: ReactNode;
  bodyClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function SideDrawer({
  title,
  trigger,
  triggerClassName,
  children,
  footer,
  bodyClassName,
  open,
  onOpenChange,
}: SideDrawerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="subtle"
            className={cn(
              'relative h-10.25 w-full rounded-xl font-semibold transition-all duration-200 ease-out',
              triggerClassName,
            )}
          />
        }
      >
        {trigger}
      </DialogTrigger>

      <DialogContent
        showCloseButton
        finalFocus={false}
        className={cn(
          'bg-ds-plain data-open:slide-in-from-start data-closed:slide-out-to-start',
          'data-open:zoom-in-100 data-closed:zoom-out-100',
          'inset-y-0! inset-s-0! inset-e-auto! top-0! flex h-dvh max-h-dvh w-[min(100%,20rem)] max-w-none! flex-col',
          'translate-x-0! translate-y-0! gap-0 overflow-hidden rounded-none p-0 ring-0 duration-300 ease-out',
        )}
      >
        <DialogHeader className="border-ds-border-muted flex flex-row items-center justify-between border-b py-3 ps-4 pe-12">
          <DialogTitle className="text-ds-text-plain text-base font-semibold">{title}</DialogTitle>
        </DialogHeader>

        <div className={cn('flex flex-1 flex-col overflow-y-auto px-4 py-2', bodyClassName)}>
          {children}
        </div>

        {footer ? (
          <div className="border-ds-border-muted mt-auto border-t px-4 py-4">{footer}</div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
