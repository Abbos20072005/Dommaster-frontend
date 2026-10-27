import { BASE_URL, CONTACT_PHONE, SOCIAL_LINKS } from '@/utils/constants';

import { htmlToText } from './seo';
import { productHref } from './urls';

/** the legal name and the address of the company (they must be the same everywhere) */
const COMPANY = {
  name: 'Buildex',
  // the seller and the operator of the personal data: «ENERGOSNAB» MChJ (Buildex is the brand)
  legalName: '«ENERGOSNAB» MChJ',
  taxId: '308542198',
  logo: `${BASE_URL}/android-chrome-512x512.png`,
  street: "Arnasoy ko'chasi, 10A",
  city: 'Toshkent',
  district: 'Chilonzor tumani'
};

const sameAs = Object.values(SOCIAL_LINKS).filter(Boolean);

const phone = CONTACT_PHONE.replace(/\s/g, '');

/** Organization + the store + the site search (the home page). */
export const siteJsonLd = () => [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    taxID: COMPANY.taxId,
    url: BASE_URL,
    logo: COMPANY.logo,
    telephone: phone,
    ...(sameAs.length ? { sameAs } : {})
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': `${BASE_URL}/#store`,
    name: COMPANY.name,
    url: BASE_URL,
    image: COMPANY.logo,
    telephone: phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.street,
      addressLocality: COMPANY.city,
      addressCountry: 'UZ'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '07:00',
      closes: '22:00'
    },
    parentOrganization: { '@id': `${BASE_URL}/#organization` }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: COMPANY.name,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string'
    }
  }
];

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/** schema.org Store for each shop of the "Stores" page (BLD-316): address, phone, place, hours. */
export const storesJsonLd = (stores: Store[]) =>
  stores.map((store) => ({
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': `${BASE_URL}/stores#store-${store.id}`,
    name: `${COMPANY.name} — ${store.name}`,
    url: `${BASE_URL}/stores`,
    ...(store.photo ? { image: store.photo } : {}),
    ...(store.phone ? { telephone: store.phone.replace(/\s/g, '') } : {}),
    address: {
      '@type': 'PostalAddress',
      ...(store.address ? { streetAddress: store.address } : {}),
      addressLocality: COMPANY.city,
      addressCountry: 'UZ'
    },
    geo: { '@type': 'GeoCoordinates', latitude: store.latitude, longitude: store.longitude },
    openingHoursSpecification: (store.schedule ?? [])
      .filter((day) => day.is_open && day.open_time && day.close_time)
      .map((day) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: WEEKDAYS[day.day],
        opens: day.open_time,
        closes: day.close_time
      })),
    parentOrganization: { '@id': `${BASE_URL}/#organization` }
  }));

/** Only the items with a name and a link: an empty item makes the markup invalid. */
export const breadcrumbJsonLd = (items: { name?: string | null; path?: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items
    .filter((item) => item.name?.trim())
    .map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: `${BASE_URL}${item.path}` } : {})
    }))
});

/**
 * Product + Offer: the price in UZS and the availability are those of the page. The rating is
 * added only when there are real reviews.
 */
export const productJsonLd = (product: Product) => {
  const price = product.discount_price ?? product.price;
  const images = (product.images ?? []).map((image) => image.image).filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: String(product.id),
    url: `${BASE_URL}${productHref(product)}`,
    ...(images.length ? { image: images } : {}),
    ...(product.description ? { description: htmlToText(product.description, 300) } : {}),
    ...(product.brand?.name ? { brand: { '@type': 'Brand', name: product.brand.name } } : {}),
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}${productHref(product)}`,
      priceCurrency: 'UZS',
      price,
      availability:
        product.quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition'
    },
    ...(product.rating && product.comments_quantity > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.comments_quantity
          }
        }
      : {})
  };
};
