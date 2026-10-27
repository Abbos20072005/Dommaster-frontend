import type { TrustPageSet } from '@/content/trust/types';

import { CONTACT_PHONE, CONTACT_PHONE_HREF, SOCIAL_LINKS } from '@/utils/constants/contacts';

/**
 * /pro (BLD-252): the page for masters and foremen. It says only what the site already does
 * (projects, expenses by project, delivery, stores) and how the PRO status is given. The terms
 * that are not confirmed yet (payment by invoice, a personal manager, an order by an estimate)
 * are NOT written here: they are added when the owner of the texts approves them (D25, OPS-13).
 * Until then the page is `noindex`, out of the sitemap and not linked from the footer.
 *
 * The buttons send `pro_landing_cta` (which button) so that the applications from this page are
 * seen in GA4 (the phone and Telegram clicks are counted by `Analytics` as well).
 */
const telegram = SOCIAL_LINKS.telegram;

const ctaButtons = (call: string, write: string, register: string) => [
  {
    text: `${call}: ${CONTACT_PHONE}`,
    href: CONTACT_PHONE_HREF,
    event: 'pro_landing_cta',
    variant: 'primary' as const
  },
  ...(telegram
    ? [{ text: write, href: telegram, event: 'pro_landing_cta', variant: 'outline' as const }]
    : []),
  { text: register, href: '/user/dashboard', variant: 'outline' as const }
];

export const proPage: TrustPageSet = {
  uz: {
    title: "Ustalar va prorablar uchun — obyektlar bo'yicha xarid hisobi | Buildex",
    description:
      "Buildex'da har bir obyekt uchun alohida loyiha oching, xaridlarni unga bog'lang va har bir obyektga qancha ketganini ko'ring.",
    h1: 'Ustalar va prorablar uchun',
    noindex: true,
    blocks: [
      {
        type: 'p',
        text: "Bir nechta obyektda ishlasangiz, qaysi tovar qaysi uyga ketganini eslab qolish qiyin. Buildex kabinetida har bir obyekt uchun alohida loyiha ochasiz, xaridlarni shunga bog'laysiz va qancha sarflanganini bir joyda ko'rasiz."
      },
      { type: 'h2', text: 'Nima qila olasiz' },
      {
        type: 'list',
        items: [
          "Har bir obyekt (uy, ofis, mijozning kvartirasi) uchun loyiha oching: nomi va manzili bilan.",
          "Butun buyurtmani bitta tugma bilan loyihaga bog'lang yoki tovarlarni belgilab, har xil loyihalarga bo'ling.",
          "Har bir loyihaga qancha ketganini ko'ring: tovarlar, yetkazish va jami, kategoriyalar bo'yicha taqsimot va davr bo'yicha filtr.",
          'Yakunlangan obyektni arxivga oling: xarajatlar saqlanadi.',
          "Eski buyurtmani qayta bering: tovarlar savatga qaytadi."
        ]
      },
      { type: 'h2', text: 'Qanday boshlash kerak' },
      {
        type: 'steps',
        items: [
          { title: "Ro'yxatdan o'ting.", text: "Telefon raqamingiz bilan kabinetga kiring." },
          {
            title: "PRO maqomini oling.",
            text: "PRO maqomini xodimlarimiz beradi, uni o'zingiz yoqib bo'lmaydi. Quyidagi raqamga qo'ng'iroq qiling yoki Telegram'da yozing."
          },
          {
            title: "Birinchi loyihani oching.",
            text: "Kabinetda «Loyihalarim» bo'limi paydo bo'ladi: loyiha oching va buyurtmalarni bog'lang."
          }
        ]
      },
      {
        type: 'faq',
        items: [
          {
            q: "Xarajatlarda nima hisoblanadi?",
            a: "To'langan va bekor qilinmagan buyurtmalar: tovarlar summasi (chegirmalar bilan) va yetkazish xarajati. Buyurtma ikki loyihaga bo'linsa, yetkazish va promokod chegirmasi tovarlar summasiga mutanosib taqsimlanadi, shuning uchun loyihalar yig'indisi to'langan summaga teng bo'ladi."
          },
          {
            q: "Tovarni boshqa loyihaga ko'chirish mumkinmi?",
            a: "Ha. Tovar boshqa loyihaga bog'langan bo'lsa, sayt ko'chirishni so'raydi. Bog'lashni olib tashlash ham mumkin."
          },
          {
            q: "Arxivdagi loyiha xarajatlari yo'qoladimi?",
            a: "Yo'q. Arxivdagi loyiha xarajatlarda hisoblanishda qoladi, unga faqat yangi tovar bog'lab bo'lmaydi."
          },
          {
            q: "PRO maqomi olib qo'yilsa, loyihalarim nima bo'ladi?",
            a: "Loyihalar saqlanadi, faqat ko'rinmaydi. PRO qaytarilganda hammasi avvalgidek paydo bo'ladi."
          }
        ]
      },
      {
        type: 'cta',
        title: "PRO maqomini olish",
        text: "Savollaringiz bo'lsa, qo'ng'iroq qiling yoki yozing.",
        buttons: ctaButtons("Qo'ng'iroq qilish", 'Telegram', 'Kabinetga kirish')
      }
    ]
  },
  ru: {
    title: 'Для мастеров и прорабов — учёт покупок по объектам | Buildex',
    description:
      'В Buildex для каждого объекта заводится отдельный проект: привязывайте к нему покупки и смотрите, сколько ушло на каждый объект.',
    h1: 'Для мастеров и прорабов',
    noindex: true,
    blocks: [
      {
        type: 'p',
        text: 'Когда работаешь на нескольких объектах, сложно помнить, какой товар ушёл на какой дом. В кабинете Buildex для каждого объекта заводится отдельный проект: вы привязываете к нему покупки и видите, сколько потрачено, в одном месте.'
      },
      { type: 'h2', text: 'Что вы сможете' },
      {
        type: 'list',
        items: [
          'Завести проект для каждого объекта (дом, офис, квартира клиента): с названием и адресом.',
          'Привязать весь заказ к проекту одной кнопкой или отметить товары и разнести их по разным проектам.',
          'Видеть, сколько ушло на каждый проект: товары, доставка и итог, разбивка по категориям и фильтр по периоду.',
          'Отправить завершённый объект в архив: расходы сохраняются.',
          'Повторить прошлый заказ: товары вернутся в корзину.'
        ]
      },
      { type: 'h2', text: 'Как начать' },
      {
        type: 'steps',
        items: [
          { title: 'Зарегистрируйтесь.', text: 'Войдите в кабинет по номеру телефона.' },
          {
            title: 'Получите статус PRO.',
            text: 'Статус PRO выдают сотрудники магазина, самостоятельно его включить нельзя. Позвоните по номеру ниже или напишите в Telegram.'
          },
          {
            title: 'Создайте первый проект.',
            text: 'В кабинете появится раздел «Мои проекты»: создайте проект и привяжите заказы.'
          }
        ]
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Что учитывается в расходах?',
            a: 'Оплаченные и не отменённые заказы: сумма товаров (с учётом скидок) и стоимость доставки. Если заказ разнесён на два проекта, доставка и скидка по промокоду делятся пропорционально сумме товаров, поэтому проекты в сумме дают оплаченную сумму.'
          },
          {
            q: 'Можно ли перенести товар в другой проект?',
            a: 'Да. Если товар уже привязан к другому проекту, сайт спросит подтверждение. Привязку также можно снять.'
          },
          {
            q: 'Пропадут ли расходы архивного проекта?',
            a: 'Нет. Архивный проект остаётся в расходах, к нему только нельзя привязать новые товары.'
          },
          {
            q: 'Что будет с проектами, если статус PRO снят?',
            a: 'Проекты сохраняются, просто не показываются. Когда статус вернут, всё появится как было.'
          }
        ]
      },
      {
        type: 'cta',
        title: 'Получить статус PRO',
        text: 'Если есть вопросы, позвоните или напишите.',
        buttons: ctaButtons('Позвонить', 'Telegram', 'Войти в кабинет')
      }
    ]
  }
};
