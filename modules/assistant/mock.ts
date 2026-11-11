import type { AssistantProduct, AssistantReply, StockStatus } from './types';

import { AssistantError } from './types';

const product = (
  id: number,
  name: string,
  price: number,
  unit: ProductUnit,
  stockStatus: StockStatus,
  discountPrice: number | null = null
): AssistantProduct => ({
  id,
  name,
  price,
  unit,
  stock_status: stockStatus,
  discount_price: discountPrice,
  images: [],
  slug: undefined
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const reply = (partial: Partial<AssistantReply> & Pick<AssistantReply, 'text'>): AssistantReply => ({
  piiMasked: false,
  products: [],
  handoff: false,
  ...partial
});

/**
 * A made-up assistant for looking at the window without the server
 * (`NEXT_PUBLIC_ASSISTANT_MOCK=1`). `/error`, `/limit`, `/rate`, `/offline` and `/disabled` show
 * the failure states.
 */
export const mockAssistantReply = async (message: string): Promise<AssistantReply> => {
  await wait(900);
  const text = message.toLowerCase();

  if (text.includes('/error')) throw new AssistantError('generic');
  if (text.includes('/limit')) throw new AssistantError('limit');
  if (text.includes('/rate')) throw new AssistantError('rate');
  if (text.includes('/offline')) throw new AssistantError('offline');
  if (text.includes('/disabled')) throw new AssistantError('disabled');

  if (/sement|цемент|cement/.test(text)) {
    return reply({ text: 'Qaysi markasi kerak?', suggestions: ['M400', 'M500', 'Bilmayman'] });
  }

  if (/yetkaz|доставк|deliver|buyurtma/.test(text)) {
    return reply({
      text: "Toshkent bo'ylab yetkazamiz. Narx va taxminiy muddat manzilingiz bo'yicha hisoblanib, checkout'da to'lovdan oldin ko'rsatiladi.",
      handoff: true
    });
  }

  if (/oblitsovka|облицов|g'isht/.test(text)) {
    return reply({
      text: "«qizil oblitsovka g'ishti» bo'yicha mos tovar topmadim. O'xshash tovarlar:",
      products: [
        product(9001, "Oblitsovka g'ishti M150, sariq rang", 3900, 'pcs', 'out_of_stock'),
        product(9002, "G'isht pishgan M100, oddiy, 250×120×65 mm", 1450, 'pcs', 'in_stock')
      ],
      notFound: true
    });
  }

  return reply({
    text: 'Mana mos tovarlar:',
    products: [
      product(9101, 'Gazoblok D500, 600×300×200 mm', 14900, 'pcs', 'in_stock'),
      product(9102, 'Gazoblok D600, 600×300×200 mm, yuk ko‘taruvchi devor uchun', 16200, 'pcs', 'low'),
      product(9103, 'Portlandsement M400, 25 kg', 42900, 'pcs', 'check', 36500)
    ],
    hasMore: true
  });
};
