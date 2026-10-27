import type { TrustPageSet } from '@/content/trust/types';

import { contactButtons } from './shared';

/**
 * /legal-entities (BLD-252): for organisations. Only the terms of the public offer (1.2, 5.4, 6.2)
 * and the requisites of the seller that the contacts page already shows. A payment by an invoice
 * and the terms of a personal manager are NOT written: they are not approved (D25, OPS-13).
 */
export const legalEntitiesPage: TrustPageSet = {
  uz: {
    title: "Yuridik shaxslar uchun — buyurtma va rekvizitlar | Buildex",
    description:
      "Tashkilotlar uchun Buildex'da buyurtma berish: vakilning vakolati, rekvizitlar, sotuvchi ma'lumotlari va aloqa.",
    h1: 'Yuridik shaxslar uchun',
    blocks: [
      {
        type: 'p',
        text: "Buildex'dan tashkilot nomidan ham buyurtma berish mumkin. Xaridor — buyurtma beradigan jismoniy yoki yuridik shaxs."
      },
      { type: 'h2', text: 'Buyurtma tartibi' },
      {
        type: 'list',
        items: [
          "Yuridik shaxs vakili o'z vakolati doirasida harakat qiladi.",
          "Tashkilot rekvizitlari buyurtmani rasmiylashtirishda taqdim etiladi.",
          "Telefon raqamiga kelgan kod (OTP) tashkilot nomidan shartnoma tuzish vakolatini o'z-o'zidan tasdiqlamaydi.",
          "Buyurtmani tasdiqlashdan oldin tovar, yetkazish va tanlangan xizmatlar qiymati hamda jami to'lov so'mda ko'rsatiladi."
        ]
      },
      { type: 'h2', text: 'Sotuvchi rekvizitlari' },
      {
        type: 'kv',
        rows: [
          { key: 'Sotuvchi', value: '«ENERGOSNAB» MChJ (Buildex brendi)' },
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
        type: 'faq',
        items: [
          {
            q: "Tashkilot nomidan buyurtma bersam bo'ladimi?",
            a: "Ha. Vakil o'z vakolati doirasida buyurtma beradi va tashkilot rekvizitlarini buyurtmani rasmiylashtirishda taqdim etadi."
          },
          {
            q: "Sotuvchi kim?",
            a: "«ENERGOSNAB» MChJ, STIR 308542198 (Buildex brendi). Rekvizitlar yuqorida."
          },
          {
            q: "To'lov va hujjatlar bo'yicha savolim bor.",
            a: "Qo'ng'iroq qiling yoki Telegram'da yozing: savolingizga javob beramiz."
          }
        ]
      },
      {
        type: 'cta',
        title: 'Savolingiz bormi?',
        text: "Buyurtma, to'lov va hujjatlar bo'yicha qo'ng'iroq qiling yoki yozing.",
        buttons: contactButtons('service_cta', { call: "Qo'ng'iroq qilish", write: 'Telegram' })
      },
      {
        type: 'links',
        label: 'Havolalar',
        items: [
          { text: 'Ommaviy oferta', href: '/oferta' },
          { text: "To'lov usullari", href: '/payment-methods' },
          { text: 'Kontaktlar', href: '/contacts' },
          { text: 'Ustalar va prorablar uchun', href: '/pro' }
        ]
      }
    ]
  },
  ru: {
    title: 'Для юридических лиц — заказ и реквизиты | Buildex',
    description:
      'Заказ в Buildex от имени организации: полномочия представителя, реквизиты, данные продавца и контакты.',
    h1: 'Для юридических лиц',
    blocks: [
      {
        type: 'p',
        text: 'В Buildex можно оформить заказ и от имени организации. Покупатель — физическое или юридическое лицо, которое оформляет заказ.'
      },
      { type: 'h2', text: 'Порядок заказа' },
      {
        type: 'list',
        items: [
          'Представитель юридического лица действует в пределах своих полномочий.',
          'Реквизиты организации предоставляются при оформлении заказа.',
          'Код (OTP), пришедший на телефон, сам по себе не подтверждает полномочия заключать договор от имени организации.',
          'До подтверждения заказа в сумах показываются стоимость товара, доставки и выбранных услуг и итог к оплате.'
        ]
      },
      { type: 'h2', text: 'Реквизиты продавца' },
      {
        type: 'kv',
        rows: [
          { key: 'Продавец', value: 'ООО «ENERGOSNAB» (бренд Buildex)' },
          { key: 'ИНН', value: '308542198' },
          {
            key: 'Юридический адрес',
            value:
              'г. Ташкент, Чиланзарский район, МСГ Катта Чиланзар-1, ул. Арнасой, дом 10А'
          },
          {
            key: 'Банк',
            value:
              'Р/с: 20208000705400780001 · МФО: 01158 · АКБ «Капиталбанк», Единый филиал, г. Ташкент'
          }
        ]
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Можно ли заказать от имени организации?',
            a: 'Да. Представитель действует в пределах своих полномочий и предоставляет реквизиты организации при оформлении заказа.'
          },
          {
            q: 'Кто продавец?',
            a: 'ООО «ENERGOSNAB», ИНН 308542198 (бренд Buildex). Реквизиты выше.'
          },
          {
            q: 'У меня вопрос по оплате и документам.',
            a: 'Позвоните или напишите в Telegram: ответим на ваш вопрос.'
          }
        ]
      },
      {
        type: 'cta',
        title: 'Есть вопросы?',
        text: 'По заказу, оплате и документам позвоните или напишите.',
        buttons: contactButtons('service_cta', { call: 'Позвонить', write: 'Telegram' })
      },
      {
        type: 'links',
        label: 'Ссылки',
        items: [
          { text: 'Публичная оферта', href: '/oferta' },
          { text: 'Способы оплаты', href: '/payment-methods' },
          { text: 'Контакты', href: '/contacts' },
          { text: 'Для мастеров и прорабов', href: '/pro' }
        ]
      }
    ]
  }
};
