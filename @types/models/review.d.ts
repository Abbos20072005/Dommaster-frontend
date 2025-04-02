interface Review {
  author: User;
  body: string;
  cons: string | null;
  dislikes: number;
  id: number;
  likes: number;
  photos: ReviewPhoto[];
  pros: string | null;
  published_at: string;
  rating: number;
}

interface ReviewPhoto {
  owner_id: number;
  url_large: string;
  url_original: string;
  url_small: string;
  url_thumb: string;
}

const data = {
  product_external_id: '807694',
  original_product_url: null,
  rating_details: null,
  headline: null,
  body: 'В целом за эти деньги материал не плохой. Выложили в квартире полы. Смотрится неплохо. В эксплуатации себя покажет.',
  photos: [],
  order_number: null,
  wordless: false,
  recommended: true,
  rating: 4,
  noindex: false,
  id: '6388d766ea8d5c0014875d0a',
  featured: false,
  videos: [],
  syndicated: false,
  origin: 'submissions_api',
  state: 'published',
  published_at: '2022-12-13T14:06:10.157+03:00',
  context_type: 'product',
  store: {
    site_host: 'petrovich.ru',
    rating: 4.3,
    name: 'СТД Петрович ООО'
  },
  dimensions: null,
  created_at: '2022-12-01T19:33:42.498+03:00',
  updated_at: '2025-02-15T11:33:19.368+03:00',
  hide_my_data: false,
  likes: 6,
  dislikes: 1,
  cons: 'Есть капли на плитке.',
  is_verified: false,
  syndication_source: null,
  pros: 'Цена.',
  comments: [],
  verified: false,
  author: {
    name: 'Антон',
    initials: 'А',
    location: 'Санкт-Петербург',
    details: '[FILTERED]',
    avatar_url: null
  }
};
