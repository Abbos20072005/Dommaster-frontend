import type { TrustPageSet } from './types';

/**
 * /contacts (BLD-103). One phone number. The map point is not decided yet (Yandex or Google,
 * the exact coordinates), so the page has no map.
 */
export const contactsPage: TrustPageSet = {
  uz: {
    title: 'Buildex aloqa — Toshkentdagi manzil va telefon',
    description:
      "Manzil: Toshkent, Chilonzor tumani, Arnasoy ko'chasi, 10A. Telefon: +998 77 240 09 09. Ish vaqti: har kuni 07:00–22:00.",
    h1: 'Kontaktlar',
    blocks: [
      { type: 'h2', text: "Biz bilan bog'lanish" },
      {
        type: 'kv',
        rows: [
          { key: 'Telefon', value: '+998 77 240 09 09', href: 'tel:+998772400909' },
          { key: 'Ish vaqti', value: 'Har kuni 07:00–22:00' },
          {
            key: 'Elektron pochta',
            value: 'buildexuz@gmail.com',
            href: 'mailto:buildexuz@gmail.com'
          },
          { key: 'Manzil', value: "Toshkent shahri, Chilonzor tumani, Arnasoy ko'chasi, 10A" }
        ]
      },
      {
        type: 'p',
        text: "Buyurtma bo'yicha murojaat qilsangiz, buyurtma raqamini ayting — tezroq javob beramiz."
      },
      { type: 'h2', text: 'Rekvizitlar' },
      {
        type: 'kv',
        rows: [
          { key: 'Sotuvchi', value: "«ENERGOSNAB» MChJ (Buildex brendi)" },
          { key: 'STIR', value: '308542198' },
          {
            key: 'Yuridik manzil',
            value:
              "Toshkent shahri, Chilonzor tumani, Katta Chilonzor-1 MFY, Arnasoy ko'chasi, 10A-uy"
          },
          {
            key: 'Bank',
            value:
              "H/r: 20208000705400780001 · MFO: 01158 · «Kapitalbank» ATB Yagona filiali, Toshkent"
          }
        ]
      },
      {
        type: 'links',
        label: 'Foydali sahifalar',
        items: [
          { text: 'Yetkazib berish', href: '/courier-delivery' },
          { text: "To'lov usullari", href: '/payment-methods' },
          { text: 'Qaytarish va kafolat', href: '/returns' },
          { text: 'Ommaviy oferta', href: '/oferta' },
          { text: 'Maxfiylik siyosati', href: '/privacy' }
        ]
      }
    ]
  },
  ru: {
    title: 'Контакты Buildex — адрес и телефон в Ташкенте',
    description:
      'Адрес: Ташкент, Чиланзарский район, ул. Арнасой, 10А. Телефон: +998 77 240 09 09. Время работы: ежедневно 07:00–22:00.',
    h1: 'Контакты',
    blocks: [
      { type: 'h2', text: 'Связаться с нами' },
      {
        type: 'kv',
        rows: [
          { key: 'Телефон', value: '+998 77 240 09 09', href: 'tel:+998772400909' },
          { key: 'Время работы', value: 'Ежедневно 07:00–22:00' },
          {
            key: 'Электронная почта',
            value: 'buildexuz@gmail.com',
            href: 'mailto:buildexuz@gmail.com'
          },
          { key: 'Адрес', value: 'г. Ташкент, Чиланзарский район, ул. Арнасой, 10А' }
        ]
      },
      {
        type: 'p',
        text: 'Если обращаетесь по заказу, назовите номер заказа — так мы ответим быстрее.'
      },
      { type: 'h2', text: 'Реквизиты' },
      {
        type: 'kv',
        rows: [
          { key: 'Продавец', value: 'ООО «ENERGOSNAB» (бренд Buildex)' },
          { key: 'ИНН', value: '308542198' },
          {
            key: 'Юридический адрес',
            value:
              'г. Ташкент, Чиланзарский р-н, МФЙ Катта Чиланзар-1, ул. Арнасой, дом 10-A'
          },
          {
            key: 'Банк',
            value: 'Р/с: 20208000705400780001 · МФО: 01158 · АКБ «КапиталБанк», Ягона филиал, г. Ташкент'
          }
        ]
      },
      {
        type: 'links',
        label: 'Полезные страницы',
        items: [
          { text: 'Доставка', href: '/courier-delivery' },
          { text: 'Способы оплаты', href: '/payment-methods' },
          { text: 'Возврат и гарантия', href: '/returns' },
          { text: 'Публичная оферта', href: '/oferta' },
          { text: 'Политика конфиденциальности', href: '/privacy' }
        ]
      }
    ]
  }
};
