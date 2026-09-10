import ProductsYouMayLike from '@/features/cart/components/products-you-may-like';
import CheckoutStep1 from '@/features/checkout/components/step-1';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

type Props = PageProps<'/[locale]/checkout'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const checkoutT = await getTranslations({ locale: locale as Locale, namespace: 'checkout' });
  const commonT = await getTranslations({ locale: locale as Locale, namespace: 'common' });

  return {
    title: `${checkoutT('title')} | ${commonT('app.title')}`,
  };
}

export default function CheckoutPage() {
  return (
    <>
      <CheckoutStep1 />
      <ProductsYouMayLike />
    </>
  );
}
