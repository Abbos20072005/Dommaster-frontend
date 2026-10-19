import type { TrustPageSet } from './types';

/** /courier-delivery (BLD-103). Neutral until the delivery model is decided (OPS-13, BLD-14). */
export const deliveryPage: TrustPageSet = {
  uz: {
    title: "Toshkent bo'ylab yetkazib berish — shartlar — Buildex",
    description:
      "Buildex'da yetkazib berish qanday ishlaydi: narxi va muddati manzil bo'yicha hisoblanadi va to'lovdan oldin ko'rsatiladi. Yetkazib berish shartlari.",
    h1: 'Yetkazib berish',
    blocks: [
      {
        type: 'p',
        text: "Buyurtmani Toshkent bo'ylab yetkazib beramiz. Yetkazish narxi va taxminiy muddati manzilingiz va buyurtma tarkibiga qarab hisoblanadi va to'lovdan oldin buyurtmani rasmiylashtirish sahifasida ko'rsatiladi."
      },
      { type: 'h2', text: 'Shartlar' },
      {
        type: 'kv',
        rows: [
          {
            key: 'Hudud',
            value:
              "Toshkent shahri. Manzilingizga yetkazish mumkinligi buyurtmani rasmiylashtirishda ko'rsatiladi."
          },
          {
            key: 'Narx',
            value:
              "Manzil va buyurtma bo'yicha hisoblanadi. Buyurtmani tasdiqlashdan oldin jami summada alohida qator bo'lib ko'rinadi."
          },
          {
            key: 'Muddat',
            value: "Taxminiy muddat buyurtmani rasmiylashtirishda ko'rsatiladi."
          },
          {
            key: "Og'ir va yirik yuk",
            value:
              "Qavatga ko'tarish, tushirish va kirish sharoiti oldindan kelishiladi. Bu xizmatlar uchun qo'shimcha haq bo'lsa, u oldindan aytiladi. Oddiy yetkazish narxi ularni avtomatik qamrab olmaydi."
          },
          {
            key: 'Kechikish',
            value:
              "Muddat buzilishi xavfi bo'lsa, sizga xabar beramiz va boshqa muddatni yoki buyurtmani bekor qilishni taklif qilamiz."
          },
          {
            key: 'Qabul qilish',
            value:
              "Tovarni olayotganda miqdori, ko'rinishi va butligini tekshiring. Farq bo'lsa, darhol bizga xabar bering. Topshirish hujjat yoki elektron tasdiq bilan qayd etiladi."
          }
        ]
      },
      { type: 'h2', text: 'Savol-javob' },
      {
        type: 'faq',
        items: [
          {
            q: 'Yetkazish narxini qachon bilaman?',
            a: "Manzilni kiritganingizdan keyin, to'lovdan oldin. Narx buyurtmaning jami summasida alohida ko'rsatiladi."
          },
          {
            q: "Yetkazish narxiga qavatga ko'tarish kiradimi?",
            a: "Avtomatik kirmaydi. Og'ir yoki yirik yuk uchun ko'tarish va tushirish oldindan kelishiladi, qo'shimcha haq bo'lsa oldindan aytiladi."
          },
          {
            q: 'Buyurtma kechiksa nima bo\'ladi?',
            a: "Sizga xabar beramiz va boshqa muddat yoki buyurtmani bekor qilishni taklif qilamiz. Bu sizning qonuniy huquqlaringizni cheklamaydi."
          },
          {
            q: "Yetkazib berib bo'lmasa, pul nima bo'ladi?",
            a: "Bajarilmagan qism uchun to'langan pul qaytariladi. Qaytarish tartibi — «Qaytarish» sahifasida."
          },
          {
            q: 'Tovarni olganimda nimani tekshiray?',
            a: "Miqdorni, ko'rinadigan shikastni va butlikni. Tovarni qabul qilganingiz yashirin nuqson yoki kafolat bo'yicha huquqlaringizdan voz kechish degani emas."
          }
        ]
      },
      { type: 'h2', text: 'Aloqa' },
      {
        type: 'p',
        text: "Savol bo'lsa: +998 77 240 09 09, har kuni 07:00–22:00. Elektron pochta: buildexuz@gmail.com."
      },
      {
        type: 'links',
        label: 'Havolalar',
        items: [
          { text: "To'lov usullari", href: '/payment-methods' },
          { text: 'Qaytarish', href: '/returns' },
          { text: 'Ommaviy oferta', href: '/oferta' }
        ]
      }
    ]
  },
  ru: {
    title: 'Доставка по Ташкенту — условия — Buildex',
    description:
      'Как работает доставка Buildex: стоимость и срок доставки рассчитываются по адресу и показываются до оплаты заказа. Подробные условия доставки.',
    h1: 'Доставка',
    blocks: [
      {
        type: 'p',
        text: 'Доставляем заказы по Ташкенту. Стоимость и ориентировочный срок доставки рассчитываются по вашему адресу и составу заказа и показываются на странице оформления до оплаты.'
      },
      { type: 'h2', text: 'Условия' },
      {
        type: 'kv',
        rows: [
          {
            key: 'Зона',
            value:
              'Город Ташкент. Возможность доставки по вашему адресу показывается при оформлении заказа.'
          },
          {
            key: 'Стоимость',
            value:
              'Рассчитывается по адресу и заказу. Отдельной строкой в итоговой сумме до подтверждения заказа.'
          },
          { key: 'Срок', value: 'Ориентировочный срок показывается при оформлении заказа.' },
          {
            key: 'Тяжёлые и крупные грузы',
            value:
              'Подъём на этаж, разгрузка и условия заезда согласуются заранее. Если за эти услуги есть доплата, о ней сообщается заранее. Обычная стоимость доставки их автоматически не включает.'
          },
          {
            key: 'Задержка',
            value:
              'Если срок под угрозой, мы сообщим вам и предложим другой срок или отмену заказа.'
          },
          {
            key: 'Приёмка',
            value:
              'При получении проверьте количество, внешний вид и комплектность. О расхождениях сообщите сразу. Передача товара фиксируется документом или электронным подтверждением.'
          }
        ]
      },
      { type: 'h2', text: 'Вопросы и ответы' },
      {
        type: 'faq',
        items: [
          {
            q: 'Когда я узнаю стоимость доставки?',
            a: 'После ввода адреса, до оплаты. Стоимость показывается отдельной строкой в итоговой сумме заказа.'
          },
          {
            q: 'Входит ли подъём на этаж в стоимость доставки?',
            a: 'Автоматически нет. Подъём и разгрузка тяжёлого или крупного груза согласуются заранее; если есть доплата, о ней сообщается заранее.'
          },
          {
            q: 'Что будет, если заказ задерживается?',
            a: 'Мы сообщим и предложим другой срок или отмену заказа. Это не ограничивает ваши законные права.'
          },
          {
            q: 'Что с деньгами, если доставка невозможна?',
            a: 'Деньги за невыполненную часть заказа возвращаются. Порядок возврата — на странице «Возврат».'
          },
          {
            q: 'Что проверить при получении?',
            a: 'Количество, видимые повреждения и комплектность. Приёмка товара не означает отказ от прав по скрытым недостаткам или гарантии.'
          }
        ]
      },
      { type: 'h2', text: 'Контакты' },
      {
        type: 'p',
        text: 'Вопросы: +998 77 240 09 09, ежедневно 07:00–22:00. Электронная почта: buildexuz@gmail.com.'
      },
      {
        type: 'links',
        label: 'Ссылки',
        items: [
          { text: 'Способы оплаты', href: '/payment-methods' },
          { text: 'Возврат', href: '/returns' },
          { text: 'Публичная оферта', href: '/oferta' }
        ]
      }
    ]
  }
};
