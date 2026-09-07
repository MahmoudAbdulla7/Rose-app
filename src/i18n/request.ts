import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { getFormats } from './formats';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const [
    common,
    auth,
    product,
    home,
    hero,
    features,
    header,
    footer,
    review,
    cart,
    address,
    checkout,
    accountSettings,
  ] = await Promise.all([
    import(`./messages/${locale}/common.json`),
    import(`./messages/${locale}/auth.json`),
    import(`./messages/${locale}/product.json`),
    import(`./messages/${locale}/home.json`),
    import(`./messages/${locale}/hero.json`),
    import(`./messages/${locale}/features.json`),
    import(`./messages/${locale}/header.json`),
    import(`./messages/${locale}/footer.json`),
    import(`./messages/${locale}/review.json`),
    import(`./messages/${locale}/cart.json`),
    import(`./messages/${locale}/address.json`),
    import(`./messages/${locale}/checkout.json`),
    import(`./messages/${locale}/account-settings.json`),
  ]);

  return {
    locale,
    timeZone: 'Africa/Cairo',
    formats: getFormats(locale),
    messages: {
      common: common.default,
      auth: auth.default,
      product: product.default,
      home: home.default,
      hero: hero.default,
      features: features.default,
      header: header.default,
      footer: footer.default,
      review: review.default,
      cart: cart.default,
      address: address.default,
      checkout: checkout.default,
      accountSettings: accountSettings.default,
    },
  };
});
