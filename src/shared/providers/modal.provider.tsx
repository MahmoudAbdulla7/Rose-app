'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

export type OpenModalOptions = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children?: ReactNode;
};

type ModalContextValue = {
  openModal: (options: OpenModalOptions) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

const EMPTY_OPTIONS: OpenModalOptions = {
  title: '',
  subtitle: undefined,
  icon: undefined,
  children: undefined,
};

export function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<OpenModalOptions>(EMPTY_OPTIONS);

  const openModal = useCallback((nextOptions: OpenModalOptions) => {
    setOptions(nextOptions);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setOptions(EMPTY_OPTIONS);
    }
  }, []);

  const value = useMemo(
    () => ({ openModal, closeModal }),
    [openModal, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          overlayClassName="bg-black/70 supports-backdrop-filter:backdrop-blur-none"
          className="bg-ds-plain text-ds-text-plain border-ds-border-subtle w-[calc(100%-2rem)] min-w-118.5 gap-0 rounded-lg p-6 ring-0 sm:p-10"
        >
          <DialogHeader className="items-center gap-0">
            {options.icon ? (
              <div
                aria-hidden="true"
                className="bg-ds-muted mb-5 flex size-20 items-center justify-center rounded-full"
              >
                <div className="bg-ds-soft flex size-13 items-center justify-center rounded-full">
                  {options.icon}
                </div>
              </div>
            ) : null}

            <DialogTitle className="text-ds-text-plain text-center text-base leading-5 font-semibold">
              {options.title}
            </DialogTitle>

            {options.subtitle ? (
              <DialogDescription className="text-ds-danger mt-2 text-center text-sm">
                {options.subtitle}
              </DialogDescription>
            ) : (
              <DialogDescription className="sr-only">{options.title}</DialogDescription>
            )}
          </DialogHeader>

          {options.children ? (
            <DialogFooter className="mt-9 grid grid-cols-2 gap-2 bg-transparent p-0 sm:grid-cols-2 sm:flex-row">
              {options.children}
            </DialogFooter>
          ) : null}
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
}
