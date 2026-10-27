import type { TrustPageSet } from '@/content/trust/types';

import { contactButtons } from './shared';

/**
 * /pickup (BLD-252): taking an order from a Buildex store. Everything here is what the site does
 * now (the choice of the shop at the checkout, the payment, the "ready for pickup" state and the
 * 2 days it is kept) and what the approved trust pages say (the returns address).
 */
export const pickupPage: TrustPageSet = {
  uz: {
    title: "Buyurtmani do'kondan olib ketish — Toshkent | Buildex",
    description:
      "Buildex buyurtmasini do'kondan olib ketish: do'kon tanlash, to'lov, buyurtma tayyor bo'lganda xabar va saqlash muddati.",
    h1: "Do'kondan olib ketish",
    blocks: [
      {
        type: 'p',
        text: "Buyurtmani Buildex do'konidan o'zingiz olib ketishingiz mumkin. Olib ketishda yetkazish narxi 0 so'm."
      },
      { type: 'h2', text: 'Qanday ishlaydi' },
      {
        type: 'steps',
        items: [
          {
            title: "Do'konni tanlang.",
            text: "Buyurtmani rasmiylashtirishda «Olib ketish»ni tanlab, ro'yxatdan do'konni belgilang. Do'kon tanlanmaguncha buyurtmani tasdiqlab bo'lmaydi."
          },
          {
            title: "To'lang.",
            text: "Onlayn (karta orqali) yoki do'konda: naqd pul yoki karta bilan. To'lov usulini buyurtmani rasmiylashtirishda tanlaysiz."
          },
          {
            title: 'Buyurtma tayyor bo\'lishini kuting.',
            text: "Buyurtma yig'ilgach, uning holati «Olib ketishga tayyor» bo'ladi. Buni kabinetda ko'rasiz."
          },
          {
            title: 'Olib keting.',
            text: "Tayyor buyurtma 2 kun saqlanadi. Olib ketish muddati buyurtma sahifasida ko'rsatiladi."
          }
        ]
      },
      { type: 'h2', text: 'Bilib qo\'ying' },
      {
        type: 'kv',
        rows: [
          {
            key: "Do'konlar",
            value: "Manzil, mo'ljal, ish vaqti va telefon «Do'konlar» sahifasida. U yerda do'kon hozir ochiq yoki yopiqligi ham ko'rinadi."
          },
          {
            key: 'Yopiq do\'kon',
            value: "Hozir yopiq do'konni ham tanlash mumkin: buyurtmani ochilgandan keyin olib ketasiz."
          },
          {
            key: 'Muddat',
            value: "Tayyor buyurtma 2 kun saqlanadi. Muddat o'tib ketsa, do'kon xodimlari bilan bog'laning."
          }
        ]
      },
      {
        type: 'faq',
        items: [
          {
            q: "Olib ketish pullikmi?",
            a: "Yo'q, olib ketishda yetkazish narxi 0 so'm. Faqat tovar uchun to'laysiz."
          },
          {
            q: "Qaysi do'konni tanlasam bo'ladi?",
            a: "Ro'yxatdagi istalgan faol do'konni. Hozirgi ro'yxat va xarita «Do'konlar» sahifasida."
          },
          {
            q: "Buyurtma tayyor bo'lganini qanday bilaman?",
            a: "Buyurtma holati «Olib ketishga tayyor»ga o'zgaradi: uni kabinetda ko'rasiz."
          },
          {
            q: "Olib ketgan tovarni qaytarsam bo'ladimi?",
            a: "Ha, qaytarish shartlari «Qaytarish» sahifasida."
          }
        ]
      },
      {
        type: 'cta',
        title: "Do'konni tanlang",
        text: "Manzillar, ish vaqti va xaritani ko'ring.",
        buttons: contactButtons(
          'service_cta',
          { call: "Qo'ng'iroq qilish", write: 'Telegram' },
          { text: "Do'konlarni ko'rish", href: '/stores' }
        )
      },
      {
        type: 'links',
        label: 'Havolalar',
        items: [
          { text: 'Yetkazib berish', href: '/courier-delivery' },
          { text: "To'lov usullari", href: '/payment-methods' },
          { text: 'Qaytarish', href: '/returns' }
        ]
      }
    ]
  },
  ru: {
    title: 'Самовывоз заказа из магазина — Ташкент | Buildex',
    description:
      'Самовывоз заказа Buildex из магазина: выбор магазина, оплата, уведомление о готовности и срок хранения.',
    h1: 'Самовывоз из магазина',
    blocks: [
      {
        type: 'p',
        text: 'Заказ можно забрать самостоятельно из магазина Buildex. При самовывозе доставка стоит 0 сум.'
      },
      { type: 'h2', text: 'Как это работает' },
      {
        type: 'steps',
        items: [
          {
            title: 'Выберите магазин.',
            text: 'При оформлении заказа выберите «Самовывоз» и отметьте магазин в списке. Пока магазин не выбран, подтвердить заказ нельзя.'
          },
          {
            title: 'Оплатите.',
            text: 'Онлайн (картой) или в магазине: наличными или картой. Способ оплаты вы выбираете при оформлении.'
          },
          {
            title: 'Дождитесь готовности.',
            text: 'Когда заказ собран, его статус станет «Готов к выдаче». Вы увидите это в кабинете.'
          },
          {
            title: 'Заберите заказ.',
            text: 'Готовый заказ хранится 2 дня. Срок получения указан на странице заказа.'
          }
        ]
      },
      { type: 'h2', text: 'Что важно знать' },
      {
        type: 'kv',
        rows: [
          {
            key: 'Магазины',
            value:
              'Адрес, ориентир, часы работы и телефон — на странице «Магазины». Там же видно, открыт магазин сейчас или закрыт.'
          },
          {
            key: 'Закрытый магазин',
            value:
              'Магазин, который сейчас закрыт, тоже можно выбрать: заказ вы заберёте после открытия.'
          },
          {
            key: 'Срок',
            value:
              'Готовый заказ хранится 2 дня. Если срок прошёл, свяжитесь с сотрудниками магазина.'
          }
        ]
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Самовывоз платный?',
            a: 'Нет, при самовывозе доставка стоит 0 сум. Вы платите только за товар.'
          },
          {
            q: 'Какой магазин можно выбрать?',
            a: 'Любой действующий магазин из списка. Актуальный список и карта — на странице «Магазины».'
          },
          {
            q: 'Как узнать, что заказ готов?',
            a: 'Статус заказа изменится на «Готов к выдаче»: вы увидите его в кабинете.'
          },
          {
            q: 'Можно ли вернуть товар, который я забрал?',
            a: 'Да, условия возврата — на странице «Возврат».'
          }
        ]
      },
      {
        type: 'cta',
        title: 'Выберите магазин',
        text: 'Посмотрите адреса, часы работы и карту.',
        buttons: contactButtons(
          'service_cta',
          { call: 'Позвонить', write: 'Telegram' },
          { text: 'Смотреть магазины', href: '/stores' }
        )
      },
      {
        type: 'links',
        label: 'Ссылки',
        items: [
          { text: 'Доставка', href: '/courier-delivery' },
          { text: 'Способы оплаты', href: '/payment-methods' },
          { text: 'Возврат', href: '/returns' }
        ]
      }
    ]
  }
};
