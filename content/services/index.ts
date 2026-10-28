/**
 * /services (BLD-252): the entrance to the service pages. A short intro and one card for each
 * page; the texts only name what the pages already say (no prices, terms or promises).
 */
export interface ServicesIndexContent {
  /** `<title>` with the site suffix (30–65 characters) */
  title: string;
  description: string;
  h1: string;
  intro: string;
  cards: { title: string; text: string; href: string }[];
}

export const servicesIndexPage: Record<'uz' | 'ru', ServicesIndexContent> = {
  uz: {
    title: "Buildex xizmatlari: yetkazish, olib ketish, qavatga ko'tarish",
    description:
      "Buildex xizmatlari: Toshkent bo'ylab kuryer yetkazish, do'kondan olib ketish, tovarni qavatga ko'tarish, yuridik shaxslar va prorablar uchun buyurtma.",
    h1: 'Xizmatlar',
    intro:
      "Buyurtmani qanday olish va rasmiylashtirishni tanlang: kuryer yetkazish, do'kondan olib ketish, qavatga ko'tarish, tashkilotlar va usta-prorablar uchun alohida sahifalar.",
    cards: [
      {
        title: 'Kuryer yetkazish',
        text: "Toshkent bo'ylab kuryer yetkazish: shartlar va tartib.",
        href: '/courier-delivery'
      },
      {
        title: "Do'kondan olib ketish",
        text: "Buyurtmani do'kondan olib ketish: manzillar va olish tartibi.",
        href: '/pickup'
      },
      {
        title: "Qavatga ko'tarish",
        text: "Tovarni qavatga ko'tarish: qanday buyurtma qilinadi.",
        href: '/lifting'
      },
      {
        title: 'Yuridik shaxslar uchun',
        text: "Tashkilot nomidan buyurtma: rekvizitlar va rasmiylashtirish.",
        href: '/legal-entities'
      },
      {
        title: 'Ustalar va prorablar',
        text: "Obyektlar bo'yicha loyihalar va xaridlar hisobi.",
        href: '/pro'
      }
    ]
  },
  ru: {
    title: 'Услуги Buildex: доставка, самовывоз, подъём на этаж',
    description:
      'Услуги Buildex: курьерская доставка по Ташкенту, самовывоз из магазинов, подъём товара на этаж, заказ для юридических лиц и прорабов.',
    h1: 'Услуги',
    intro:
      'Выберите, как получить и оформить заказ: курьерская доставка, самовывоз из магазина, подъём на этаж, отдельные страницы для организаций и мастеров-прорабов.',
    cards: [
      {
        title: 'Доставка',
        text: 'Курьерская доставка по Ташкенту: условия и порядок.',
        href: '/courier-delivery'
      },
      {
        title: 'Самовывоз',
        text: 'Заберите заказ в магазине: адреса и порядок получения.',
        href: '/pickup'
      },
      {
        title: 'Подъём на этаж',
        text: 'Подъём товара на этаж: как заказать.',
        href: '/lifting'
      },
      {
        title: 'Для юрлиц',
        text: 'Заказ от имени организации: реквизиты и оформление.',
        href: '/legal-entities'
      },
      {
        title: 'PRO для прорабов',
        text: 'Проекты по объектам и учёт закупок.',
        href: '/pro'
      }
    ]
  }
};
