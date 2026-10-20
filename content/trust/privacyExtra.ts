import type { TrustPageSet } from './types';

/**
 * /privacy-request and /privacy/partners: the two pages the privacy policy points to (1.2, 5.4,
 * 5.5). They only repeat what the policy itself says. The Russian text is a translation of it
 * and is to be confirmed by the owner of the legal texts.
 */
export const privacyRequestPage: TrustPageSet = {
  uz: {
    title: "Ma'lumotlar bo'yicha so'rov — Buildex",
    description:
      "Shaxsiy ma'lumotlaringiz bo'yicha so'rov yuborish: elektron pochta, telefon va akkauntni o'chirish tartibi.",
    h1: "Shaxsiy ma'lumotlar bo'yicha so'rov",
    blocks: [
      {
        type: 'p',
        text: "Ma'lumotlaringiz bo'yicha savol yoki so'rovingiz bo'lsa, shaxsga doir ma'lumotlarni himoya qilish bo'yicha mas'ul xodimga yozing yoki qo'ng'iroq qiling. Telefon raqamingizni va so'rov mazmunini ko'rsating."
      },
      {
        type: 'kv',
        rows: [
          {
            key: 'Elektron pochta',
            value: 'buildexuz@gmail.com',
            href: 'mailto:buildexuz@gmail.com'
          },
          { key: 'Telefon', value: '+998 77 240 09 09', href: 'tel:+998772400909' }
        ]
      },
      {
        type: 'links',
        label: 'Foydali sahifalar',
        items: [
          { text: 'Maxfiylik siyosati', href: '/privacy' },
          { text: "Akkauntni o'chirish tartibi", href: '/account/delete' }
        ]
      }
    ]
  },
  ru: {
    title: 'Запрос по персональным данным — Buildex',
    description:
      'Как отправить запрос по вашим персональным данным: электронная почта, телефон и порядок удаления аккаунта.',
    h1: 'Запрос по персональным данным',
    blocks: [
      {
        type: 'p',
        text: 'Если у вас есть вопрос или запрос по вашим данным, напишите или позвоните ответственному за защиту персональных данных. Укажите номер телефона и суть запроса.'
      },
      {
        type: 'kv',
        rows: [
          {
            key: 'Электронная почта',
            value: 'buildexuz@gmail.com',
            href: 'mailto:buildexuz@gmail.com'
          },
          { key: 'Телефон', value: '+998 77 240 09 09', href: 'tel:+998772400909' }
        ]
      },
      {
        type: 'links',
        label: 'Полезные страницы',
        items: [
          { text: 'Политика конфиденциальности', href: '/privacy' },
          { text: 'Порядок удаления аккаунта', href: '/account/delete' }
        ]
      }
    ]
  }
};

export const privacyPartnersPage: TrustPageSet = {
  uz: {
    title: "Hamkorlar va xizmat yetkazib beruvchilar — Buildex",
    description:
      "Buildex ma'lumotlarga ishlov berishda jalb qiladigan hamkorlar va xizmat yetkazib beruvchilar ro'yxati.",
    h1: 'Hamkorlar va xizmat yetkazib beruvchilar',
    blocks: [
      {
        type: 'p',
        text: "Bu ro'yxat Maxfiylik siyosatining 5.4 va 5.5-bandlarida aytilgan hamkorlarni ko'rsatadi."
      },
      {
        type: 'table',
        head: ['Hamkor', 'Vazifasi', "Ma'lumot toifasi / hudud"],
        rows: [
          [
            "BUILDEX yetkazib berish xizmati va shartnoma asosidagi kuryer hamkorlari",
            'Buyurtmani yetkazish yoki olib ketishni tashkil etish',
            "Oluvchining aloqa va topshirish uchun zarur ma'lumotlari"
          ],
          [
            "Hosting",
            "Sayt va ilovalarning ishlashi",
            "O'zbekistondagi data-markaz"
          ],
          [
            'ERP/1C',
            'Buyurtma va qoldiqlarni yuritish',
            "BUILDEX ichki serverlari (O'zbekiston)"
          ]
        ]
      },
      {
        type: 'links',
        label: 'Batafsil',
        items: [{ text: 'Maxfiylik siyosati', href: '/privacy' }]
      }
    ]
  },
  ru: {
    title: 'Партнёры и поставщики услуг — Buildex',
    description:
      'Список партнёров и поставщиков услуг, которых Buildex привлекает к обработке данных.',
    h1: 'Партнёры и поставщики услуг',
    blocks: [
      {
        type: 'p',
        text: 'В этом списке указаны партнёры, о которых говорится в пунктах 5.4 и 5.5 Политики конфиденциальности.'
      },
      {
        type: 'table',
        head: ['Партнёр', 'Задача', 'Категория данных / регион'],
        rows: [
          [
            'Собственная служба доставки BUILDEX и курьерские партнёры по договору',
            'Организация доставки или самовывоза заказа',
            'Контактные данные получателя и данные, необходимые для передачи заказа'
          ],
          ['Хостинг', 'Работа сайта и приложений', 'Дата-центр в Узбекистане'],
          [
            'ERP/1C',
            'Ведение заказов и остатков',
            'Внутренние серверы BUILDEX (Узбекистан)'
          ]
        ]
      },
      {
        type: 'links',
        label: 'Подробнее',
        items: [{ text: 'Политика конфиденциальности', href: '/privacy' }]
      }
    ]
  }
};
