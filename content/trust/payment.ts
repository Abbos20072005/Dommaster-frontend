import type { TrustPageSet } from './types';

/** /payment-methods (BLD-103): online by card and a bank transfer for companies. */
export const paymentPage: TrustPageSet = {
  uz: {
    title: "Buyurtmani to'lash usullari — Buildex",
    description:
      "Buildex'da buyurtmani to'lash: Atmos, Click, Payme yoki Uzum orqali karta bilan onlayn, yuridik shaxslar uchun bank o'tkazmasi.",
    h1: "To'lov usullari",
    blocks: [
      {
        type: 'p',
        text: "Buyurtmani karta bilan onlayn to'lashingiz mumkin. Yuridik shaxslar bank o'tkazmasi orqali to'laydi. Jami summa so'mda va buyurtmani tasdiqlashdan oldin ko'rsatiladi."
      },
      { type: 'h2', text: 'Usullar' },
      {
        type: 'table',
        head: ['Usul', 'Kimga', 'Qanday'],
        rows: [
          [
            'Karta bilan onlayn',
            'Hamma xaridorlar',
            "Buyurtmani rasmiylashtirishda to'lov tizimini tanlaysiz: Atmos, Click, Payme yoki Uzum. To'lov shu tizim oynasida o'tadi."
          ],
          [
            "Bank o'tkazmasi",
            'Yuridik shaxslar',
            "Tashkilot rekvizitlari buyurtmada ko'rsatiladi, to'lov quyidagi hisob raqamiga o'tkaziladi."
          ]
        ]
      },
      {
        type: 'p',
        text: "Har bir buyurtma uchun qaysi usullar mavjudligi buyurtmani rasmiylashtirish sahifasida ko'rsatiladi."
      },
      { type: 'h2', text: 'Shartlar' },
      {
        type: 'list',
        items: [
          "Tovar summasi, yetkazish va boshqa tanlangan xizmatlar narxi hamda jami summa to'lovdan oldin so'mda ko'rsatiladi.",
          "Tasdiqlangan buyurtma narxi sizning roziligingizsiz oshirilmaydi.",
          "To'lov to'lov tizimidan tasdiq kelganda o'tgan hisoblanadi. Pul ikki marta yechilgan bo'lsa, bizga murojaat qiling — tekshirib, ortiqchasini qaytaramiz.",
          "Chek va boshqa savdo hujjatlari qonunchilikka muvofiq beriladi.",
          "Buyurtma bekor qilinsa yoki yetkazib bo'lmasa, bajarilmagan qism uchun pul qaytariladi, odatda to'langan usul bilan. Batafsil — «Qaytarish» sahifasida."
        ]
      },
      { type: 'h2', text: 'Xavfsizlik' },
      {
        type: 'list',
        items: [
          "Karta ma'lumotlari va bank tasdiqlash kodlari to'lov tizimi oynasida kiritiladi. Buildex ularni o'zining kirish jurnallarida saqlamaydi.",
          "Buildex xodimlari sizdan SMS kod so'ramaydi. Kodni hech kimga bermang.",
          "To'lov rekvizitlari faqat rasmiy buyurtma yoki rasmiy aloqa kanali orqali beriladi."
        ]
      },
      { type: 'h2', text: "Yuridik shaxslar uchun bank rekvizitlari" },
      {
        type: 'kv',
        rows: [
          { key: 'Tashkilot', value: "«ENERGOSNAB» MChJ" },
          {
            key: 'Manzil',
            value: "Toshkent shahri, Chilonzor tumani, Katta Chilonzor-1 MFY, Arnasoy ko'chasi, 10A-uy"
          },
          { key: 'STIR', value: '308542198' },
          { key: 'H/r', value: '20208000705400780001' },
          { key: 'MFO', value: '01158' },
          { key: 'Bank', value: "«Kapitalbank» ATB Yagona filiali, Toshkent" }
        ]
      },
      { type: 'h2', text: 'Savol-javob' },
      {
        type: 'faq',
        items: [
          {
            q: "Qaysi kartalar bilan to'lash mumkin?",
            a: "To'lov oynasida tanlangan tizim qabul qiladigan kartalar bilan."
          },
          {
            q: "To'lov o'tdimi, qanday bilaman?",
            a: "To'lov tizimidan tasdiq kelgach buyurtma holati yangilanadi va sizga xabar yuboriladi."
          },
          {
            q: "Pul yechildi, lekin buyurtma ko'rinmayapti.",
            a: "Buyurtma raqami yoki to'lov vaqti bilan bizga murojaat qiling: +998 77 240 09 09."
          },
          {
            q: "Yuridik shaxs sifatida qanday to'layman?",
            a: "Buyurtmada tashkilot rekvizitlarini kiriting va yuqoridagi hisob raqamiga bank o'tkazmasi qiling."
          }
        ]
      },
      { type: 'h2', text: 'Aloqa' },
      { type: 'p', text: '+998 77 240 09 09, har kuni 07:00–22:00 · buildexuz@gmail.com' },
      {
        type: 'links',
        label: 'Havolalar',
        items: [
          { text: 'Yetkazib berish', href: '/courier-delivery' },
          { text: 'Qaytarish', href: '/returns' },
          { text: 'Ommaviy oferta', href: '/oferta' }
        ]
      }
    ]
  },
  ru: {
    title: 'Способы оплаты заказа — Buildex',
    description:
      'Оплата заказов в Buildex: онлайн картой через Atmos, Click, Payme или Uzum, для юридических лиц — банковский перевод.',
    h1: 'Способы оплаты',
    blocks: [
      {
        type: 'p',
        text: 'Заказ можно оплатить картой онлайн. Юридические лица оплачивают банковским переводом. Итоговая сумма в сумах показывается до подтверждения заказа.'
      },
      { type: 'h2', text: 'Способы' },
      {
        type: 'table',
        head: ['Способ', 'Для кого', 'Как'],
        rows: [
          [
            'Картой онлайн',
            'Все покупатели',
            'При оформлении выберите платёжную систему: Atmos, Click, Payme или Uzum. Оплата проходит в окне этой системы.'
          ],
          [
            'Банковский перевод',
            'Юридические лица',
            'Реквизиты организации указываются в заказе, оплата переводится на расчётный счёт ниже.'
          ]
        ]
      },
      {
        type: 'p',
        text: 'Доступные способы для конкретного заказа показываются на странице оформления.'
      },
      { type: 'h2', text: 'Условия' },
      {
        type: 'list',
        items: [
          'Сумма товаров, доставки и других выбранных услуг и итоговая сумма показываются в сумах до оплаты.',
          'Цена подтверждённого заказа не повышается без вашего согласия.',
          'Оплата считается прошедшей после подтверждения от платёжной системы. Если деньги списаны дважды, напишите нам — проверим и вернём лишнее.',
          'Чек и другие документы выдаются в соответствии с законодательством.',
          'Если заказ отменён или доставка невозможна, деньги за невыполненную часть возвращаются, как правило, тем же способом. Подробнее — на странице «Возврат».'
        ]
      },
      { type: 'h2', text: 'Безопасность' },
      {
        type: 'list',
        items: [
          'Данные карты и банковские коды подтверждения вводятся в окне платёжной системы. Buildex не хранит их в своих журналах входа.',
          'Сотрудники Buildex не запрашивают SMS-код. Никому его не сообщайте.',
          'Платёжные реквизиты сообщаются только в официальном заказе или по официальному каналу связи.'
        ]
      },
      { type: 'h2', text: 'Банковские реквизиты для юридических лиц' },
      {
        type: 'kv',
        rows: [
          { key: 'Организация', value: 'ООО «ENERGOSNAB»' },
          {
            key: 'Адрес',
            value: 'г. Ташкент, Чиланзарский р-н, МФЙ Катта Чиланзар-1, ул. Арнасой, дом 10-A'
          },
          { key: 'ИНН', value: '308542198' },
          { key: 'Р/с', value: '20208000705400780001' },
          { key: 'МФО', value: '01158' },
          { key: 'Банк', value: 'АКБ «КапиталБанк», Ягона филиал, г. Ташкент' }
        ]
      },
      { type: 'h2', text: 'Вопросы и ответы' },
      {
        type: 'faq',
        items: [
          {
            q: 'Какими картами можно оплатить?',
            a: 'Картами, которые принимает выбранная платёжная система.'
          },
          {
            q: 'Как понять, что оплата прошла?',
            a: 'После подтверждения от платёжной системы статус заказа обновится и вы получите уведомление.'
          },
          {
            q: 'Деньги списаны, а заказа не видно.',
            a: 'Напишите нам с номером заказа или временем оплаты: +998 77 240 09 09.'
          },
          {
            q: 'Как оплатить юридическому лицу?',
            a: 'Укажите реквизиты организации в заказе и сделайте банковский перевод на расчётный счёт выше.'
          }
        ]
      },
      { type: 'h2', text: 'Контакты' },
      { type: 'p', text: '+998 77 240 09 09, ежедневно 07:00–22:00 · buildexuz@gmail.com' },
      {
        type: 'links',
        label: 'Ссылки',
        items: [
          { text: 'Доставка', href: '/courier-delivery' },
          { text: 'Возврат', href: '/returns' },
          { text: 'Публичная оферта', href: '/oferta' }
        ]
      }
    ]
  }
};
