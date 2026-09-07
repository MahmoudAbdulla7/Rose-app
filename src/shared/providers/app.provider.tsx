import ReactQueryProvider from './react-query.provider';
import ThemeProvider from './theme.provider';
import { Toaster } from '../ui/sonner';
import NextAuthProvider from './next-auth.provider';
import NextIntlProvider from './next-intl.provider';
import { ModalProvider } from './modal.provider';

import type { NextIntlConfigProps } from '../lib/types/global';
import { CartSyncProvider } from '@/features/auth/providers/cart-sync.provider';
import { WishlistSyncProvider } from '@/features/auth/providers/wishlist-sync-provider';

type AppProviderProps = {
  children: React.ReactNode;
  nextIntlConfig: NextIntlConfigProps;
};

export default function AppProvider({ children, nextIntlConfig }: AppProviderProps) {
  return (
    <NextIntlProvider nextIntlConfig={nextIntlConfig}>
      <ThemeProvider>
        <ReactQueryProvider>
          <NextAuthProvider>
            <ModalProvider>
              <CartSyncProvider>
                <WishlistSyncProvider>{children}</WishlistSyncProvider>
              </CartSyncProvider>
            </ModalProvider>
          </NextAuthProvider>
          <Toaster duration={3000} closeButton />
        </ReactQueryProvider>
      </ThemeProvider>
    </NextIntlProvider>
  );
}
