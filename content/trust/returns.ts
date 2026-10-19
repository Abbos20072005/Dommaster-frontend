import type { TrustPageSet } from './types';

/**
 * /returns (BLD-103). Every term is from the public offer, section 8. The warranty is a section
 * of this page: the footer links to `/returns#kafolat` (the id is the same in both languages).
 */
export const returnsPage: TrustPageSet = {
  uz: {
    title: 'Tovarni qaytarish va almashtirish — Buildex',
    description:
      "Buildex'dan olingan tovarni qanday qaytarish yoki almashtirish mumkin: qaytarish shartlari, ariza berish tartibi va pulni qaytarish.",
    h1: 'Qaytarish va almashtirish',
    blocks: [
      { type: 'h2', text: 'Qisqacha' },
      {
        type: 'p',
        text: "Sifatli tovarni xarid kunidan 10 kun ichida almashtirish mumkin; bunday tovar sotuvda bo'lmasa, pul qaytariladi. Nuqsonli, noto'g'ri yoki to'liq bo'lmagan tovar bo'yicha talablar qonunga muvofiq ko'rib chiqiladi. Murojaatni 3 ish kunida ko'rib chiqamiz, qaror qabul qilingach pulni 10 kalendar kun ichida qaytaramiz."
      },
      { type: 'h2', text: 'Shartlar' },
      {
        type: 'table',
        head: ['Holat', 'Nima qilish mumkin', 'Muddat'],
        rows: [
          [
            "Sifatli tovar to'g'ri kelmadi",
            "Ayni shunday tovarga almashtirish; u sotuvda bo'lmasa — pulni qaytarish. Qonunda belgilangan shartlar amal qiladi; hukumat belgilagan almashtirilmaydigan tovarlar ro'yxati hisobga olinadi.",
            'Xarid kunidan 10 kun'
          ],
          [
            "Tovar nuqsonli, noto'g'ri yoki to'liq emas",
            "Almashtirish, nuqsonni bartaraf etish, narxni kamaytirish yoki xaridni bekor qilish — qonunga muvofiq",
            "Qonun va kafolat muddati bo'yicha"
          ],
          [
            "Buyurtmani o'zgartirish yoki bekor qilish",
            "Buyurtma qaysi bosqichda ekaniga qarab ko'rib chiqiladi",
            "Murojaat qilgan paytingizdan"
          ]
        ]
      },
      { type: 'h2', text: 'Qanday qaytariladi' },
      {
        type: 'steps',
        items: [
          {
            title: 'Murojaat qiling.',
            text: "Telefon +998 77 240 09 09 yoki buildexuz@gmail.com. Buyurtma raqamini va sababini ayting."
          },
          {
            title: "Ko'rib chiqamiz.",
            text: "Murojaat 3 ish kuni ichida ko'rib chiqiladi. Qarorni, summani va keyingi qadamni sizga bildiramiz."
          },
          {
            title: 'Tovarni topshiring.',
            text: "Manzil: Toshkent, Chilonzor tumani, Arnasoy ko'chasi, 10A-uy, yoki buyurtmada ko'rsatilgan Buildex olib ketish nuqtasi. Yirik tovarni o'zimiz olib ketishni siz bilan kelishamiz."
          },
          {
            title: 'Pulni qaytaramiz.',
            text: "Qaror qabul qilingach 10 kalendar kun ichida. Bank yoki to'lov tizimi orqali o'tish vaqti bu muddatga kirmaydi. Qonundagi majburiy muddatlar ustun."
          }
        ]
      },
      { type: 'h2', text: 'Pul qanday qaytariladi' },
      {
        type: 'list',
        items: [
          "Odatda siz to'lagan usul bilan. Boshqa usul qonun doirasida kelishiladi.",
          "Pul o'tkazish xarajatlarini Buildex to'laydi.",
          "Tovarni ortga tashish xarajati qaytarish sababi va qonunchilikka qarab belgilanadi."
        ]
      },
      { type: 'h2', text: 'Kafolat', id: 'kafolat' },
      {
        type: 'list',
        items: [
          "Kafolat muddati va undan foydalanish tartibi tovar hujjatida yoki tovar sahifasida ko'rsatiladi.",
          "Chek yo'qolgan bo'lsa ham, xaridni boshqa dalil bilan tasdiqlay olsangiz, talabingiz faqat shu sababli rad etilmaydi.",
          "Tovarni qabul qilganingiz yashirin nuqson yoki kafolat bo'yicha huquqlaringizdan voz kechish degani emas."
        ]
      },
      { type: 'h2', text: 'Savol-javob' },
      {
        type: 'faq',
        items: [
          {
            q: 'Sifatli tovarni qaytarsam, pulni darhol olamanmi?',
            a: "Avval ayni shunday tovarga almashtirish taklif qilinadi. Bunday tovar sotuvda bo'lmasa, pul qaytariladi."
          },
          {
            q: "Qaysi tovarlarni qaytarib bo'lmaydi?",
            a: "Hukumat belgilagan almashtirilmaydigan tovarlar ro'yxatidagilar. Nuqsonli tovarga bu cheklov tegishli emas."
          },
          {
            q: "Tovar katta va og'ir. O'zim olib kelishim kerakmi?",
            a: "Yo'q. Yirik tovarni olib ketishni siz bilan kelishamiz."
          },
          {
            q: 'Pul qachon qaytadi?',
            a: "Qaror qabul qilingach 10 kalendar kun ichida. Bank yoki to'lov tizimi pulni kartangizga o'tkazishi uchun qo'shimcha vaqt kerak bo'lishi mumkin."
          },
          {
            q: 'Buyurtmani hali olmadim. Bekor qilsam bo\'ladimi?',
            a: "Ha, buyurtma raqami bilan murojaat qiling. Bekor qilish buyurtma qaysi bosqichda ekaniga qarab ko'rib chiqiladi."
          }
        ]
      },
      { type: 'h2', text: 'Aloqa' },
      {
        type: 'p',
        text: "+998 77 240 09 09, har kuni 07:00–22:00 · buildexuz@gmail.com · Toshkent, Chilonzor tumani, Arnasoy ko'chasi, 10A"
      },
      {
        type: 'links',
        label: 'Havolalar',
        items: [
          { text: 'Yetkazib berish', href: '/courier-delivery' },
          { text: "To'lov usullari", href: '/payment-methods' },
          { text: 'Ommaviy oferta (8-bo\'lim)', href: '/oferta' }
        ]
      }
    ]
  },
  ru: {
    title: 'Возврат и обмен товара — Buildex',
    description:
      'Как вернуть или обменять товар, купленный в Buildex: условия возврата, порядок оформления заявки и сроки возврата денег.',
    h1: 'Возврат и обмен',
    blocks: [
      { type: 'h2', text: 'Коротко' },
      {
        type: 'p',
        text: 'Товар надлежащего качества можно обменять в течение 10 дней со дня покупки; если такого товара нет в продаже, деньги возвращаются. Требования по товару с недостатками, неправильному или некомплектному товару рассматриваются по закону. Обращение рассматриваем за 3 рабочих дня, после решения возвращаем деньги в течение 10 календарных дней.'
      },
      { type: 'h2', text: 'Условия' },
      {
        type: 'table',
        head: ['Ситуация', 'Что можно сделать', 'Срок'],
        rows: [
          [
            'Товар надлежащего качества не подошёл',
            'Обмен на такой же товар; если его нет в продаже — возврат денег. Действуют условия, установленные законом; учитывается утверждённый правительством перечень товаров, не подлежащих обмену.',
            '10 дней со дня покупки'
          ],
          [
            'Товар с недостатком, неправильный или некомплектный',
            'Замена, устранение недостатка, снижение цены или расторжение покупки — по закону',
            'По закону и гарантийному сроку'
          ],
          [
            'Изменение или отмена заказа',
            'Рассматривается с учётом этапа выполнения заказа',
            'С момента обращения'
          ]
        ]
      },
      { type: 'h2', text: 'Как вернуть' },
      {
        type: 'steps',
        items: [
          {
            title: 'Обратитесь к нам.',
            text: 'Телефон +998 77 240 09 09 или buildexuz@gmail.com. Укажите номер заказа и причину.'
          },
          {
            title: 'Мы рассмотрим обращение',
            text: 'в течение 3 рабочих дней и сообщим решение, сумму и следующий шаг.'
          },
          {
            title: 'Передайте товар.',
            text: 'Адрес: Ташкент, Чиланзарский район, ул. Арнасой, 10А, или пункт выдачи Buildex, указанный в заказе. Вывоз крупного товара согласуем с вами.'
          },
          {
            title: 'Вернём деньги',
            text: 'в течение 10 календарных дней после решения. Время прохождения платежа через банк или платёжную систему в этот срок не входит. Обязательные сроки по закону имеют приоритет.'
          }
        ]
      },
      { type: 'h2', text: 'Как возвращаются деньги' },
      {
        type: 'list',
        items: [
          'Как правило, тем же способом, которым вы платили. Другой способ согласуется в рамках закона.',
          'Расходы на перевод денег несёт Buildex.',
          'Расходы на обратную перевозку товара определяются причиной возврата и законодательством.'
        ]
      },
      { type: 'h2', text: 'Гарантия', id: 'kafolat' },
      {
        type: 'list',
        items: [
          'Гарантийный срок и порядок его использования указаны в документах на товар или на странице товара.',
          'Если чек утерян, но покупку можно подтвердить иначе, требование не отклоняется только по этой причине.',
          'Приёмка товара не означает отказ от прав по скрытым недостаткам или гарантии.'
        ]
      },
      { type: 'h2', text: 'Вопросы и ответы' },
      {
        type: 'faq',
        items: [
          {
            q: 'Если верну качественный товар, деньги вернут сразу?',
            a: 'Сначала предлагается обмен на такой же товар. Если его нет в продаже, деньги возвращаются.'
          },
          {
            q: 'Какие товары нельзя вернуть?',
            a: 'Товары из утверждённого правительством перечня товаров, не подлежащих обмену. На товар с недостатками это ограничение не распространяется.'
          },
          {
            q: 'Товар большой и тяжёлый. Нужно привезти самому?',
            a: 'Нет. Вывоз крупного товара согласуем с вами.'
          },
          {
            q: 'Когда вернутся деньги?',
            a: 'В течение 10 календарных дней после решения. Банку или платёжной системе может понадобиться дополнительное время для зачисления на карту.'
          },
          {
            q: 'Заказ ещё не получен. Можно отменить?',
            a: 'Да, обратитесь с номером заказа. Отмена рассматривается с учётом этапа выполнения заказа.'
          }
        ]
      },
      { type: 'h2', text: 'Контакты' },
      {
        type: 'p',
        text: '+998 77 240 09 09, ежедневно 07:00–22:00 · buildexuz@gmail.com · Ташкент, Чиланзарский район, ул. Арнасой, 10А'
      },
      {
        type: 'links',
        label: 'Ссылки',
        items: [
          { text: 'Доставка', href: '/courier-delivery' },
          { text: 'Способы оплаты', href: '/payment-methods' },
          { text: 'Публичная оферта (раздел 8)', href: '/oferta' }
        ]
      }
    ]
  }
};
