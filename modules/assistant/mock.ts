import type { AssistantProduct, AssistantReply } from './types';

import { AssistantError } from './types';

const product = (
  id: number,
  name: string,
  price: number,
  unit: ProductUnit,
  quantity: number,
  discountPrice: number | null = null
): AssistantProduct => ({
  id,
  name,
  price,
  unit,
  quantity,
  discount_price: discountPrice,
  images: [],
  slug: undefined
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * A made-up assistant for looking at the window while the chat endpoint is not ready
 * (`NEXT_PUBLIC_ASSISTANT_MOCK=1`). `/error`, `/limit` and `/offline` show the failure states.
 */
export const mockAssistantReply = async (message: string): Promise<AssistantReply> => {
  await wait(900);
  const text = message.toLowerCase();

  if (text.includes('/error')) throw new AssistantError('generic');
  if (text.includes('/limit')) throw new AssistantError('limit');
  if (text.includes('/offline')) throw new AssistantError('offline');
  if (text.includes('/disabled')) throw new AssistantError('disabled');

  if (/sement|цемент|cement/.test(text)) {
    return {
      text: 'Qaysi markasi kerak?',
      products: [],
      suggestions: ['M400', 'M500', 'Bilmayman'],
      handoff: false,
      notFound: false,
      hasMore: false
    };
  }

  if (/yetkaz|доставк|deliver/.test(text)) {
    return {
      text: "Toshkent bo'ylab yetkazamiz. Narx va taxminiy muddat manzilingiz bo'yicha hisoblanib, checkout'da to'lovdan oldin ko'rsatiladi.",
      products: [],
      suggestions: [],
      source: { title: 'Yetkazib berish shartlari', href: '/courier-delivery' },
      handoff: true,
      notFound: false,
      hasMore: false
    };
  }

  if (/oblitsovka|облицов|g'isht/.test(text)) {
    return {
      text: "«qizil oblitsovka g'ishti» bo'yicha mos tovar topmadim. O'xshash tovarlar:",
      products: [
        product(9001, "Oblitsovka g'ishti M150, sariq rang", 3900, 'pcs', 0),
        product(9002, "G'isht pishgan M100, oddiy, 250×120×65 mm", 1450, 'pcs', 400)
      ],
      suggestions: [],
      handoff: false,
      notFound: true,
      hasMore: false
    };
  }

  return {
    text: 'Mana mos tovarlar:',
    products: [
      product(9101, 'Gazoblok D500, 600×300×200 mm', 14900, 'pcs', 400),
      product(9102, 'Gazoblok D600, 600×300×200 mm, yuk ko‘taruvchi devor uchun', 16200, 'pcs', 6),
      product(9103, 'Portlandsement M400, 25 kg', 42900, 'pcs', 12, 36500)
    ],
    suggestions: [],
    handoff: false,
    notFound: false,
    hasMore: true
  };
};
