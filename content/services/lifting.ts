import type { TrustPageSet } from '@/content/trust/types';

import { contactButtons } from './shared';

/**
 * /lifting (BLD-252): lifting to a floor and unloading. The terms are only those of the approved
 * delivery page and of the public offer, 7.2: they are agreed in advance, a fee is told in
 * advance, the delivery price does not include them automatically. No prices are written here.
 */
export const liftingPage: TrustPageSet = {
  uz: {
    title: "Qavatga ko'tarish va tushirish — og'ir tovarlar | Buildex",
    description:
      "Og'ir va yirik tovarni qavatga ko'tarish va tushirish: shartlar oldindan kelishiladi, qo'shimcha haq bo'lsa oldindan aytiladi.",
    h1: "Qavatga ko'tarish va tushirish",
    blocks: [
      {
        type: 'p',
        text: "Sement, gazoblok, kafel, profil va boshqa og'ir yoki yirik tovarni yetkazganda qavatga ko'tarish va tushirish kerak bo'lishi mumkin. Bu xizmat haqida buyurtmadan oldin kelishib olamiz."
      },
      { type: 'h2', text: 'Shartlar' },
      {
        type: 'kv',
        rows: [
          {
            key: 'Kelishuv',
            value:
              "Qavatga ko'tarish, tushirish va kirish sharoiti oldindan kelishiladi."
          },
          {
            key: "Qo'shimcha haq",
            value:
              "Bu xizmatlar uchun qo'shimcha haq bo'lsa, u oldindan aytiladi. Oddiy yetkazish narxi ularni avtomatik qamrab olmaydi."
          },
          {
            key: 'Jami summa',
            value:
              "Buyurtmani tasdiqlashdan oldin tovar, yetkazish va tanlangan xizmatlar qiymati hamda jami to'lov so'mda ko'rsatiladi."
          }
        ]
      },
      { type: 'h2', text: 'Nimani aytish kerak' },
      {
        type: 'list',
        items: [
          'Yetkazish manzili va nechanchi qavat.',
          'Lift bormi va uning o\'lchami; kirish joyi va yo\'lak qanday.',
          "Qaysi tovar va qancha: og'irligi va hajmiga qarab xizmat kelishiladi."
        ]
      },
      {
        type: 'faq',
        items: [
          {
            q: "Yetkazish narxiga qavatga ko'tarish kiradimi?",
            a: "Avtomatik kirmaydi. Og'ir yoki yirik yuk uchun ko'tarish va tushirish oldindan kelishiladi, qo'shimcha haq bo'lsa oldindan aytiladi."
          },
          {
            q: "Qo'shimcha haqni qachon bilaman?",
            a: "Buyurtmani tasdiqlashdan oldin: tanlangan xizmatlar qiymati jami summada ko'rsatiladi."
          },
          {
            q: "Kelishishni qayerda boshlayman?",
            a: "Qo'ng'iroq qiling yoki Telegram'da yozing: manzil va tovarni ayting."
          }
        ]
      },
      {
        type: 'cta',
        title: 'Ko\'tarish bo\'yicha kelishing',
        text: "Manzil va tovarni ayting, shartlarni oldindan aniqlaymiz.",
        buttons: contactButtons('service_cta', { call: "Qo'ng'iroq qilish", write: 'Telegram' })
      },
      {
        type: 'links',
        label: 'Havolalar',
        items: [
          { text: 'Yetkazib berish', href: '/courier-delivery' },
          { text: "To'lov usullari", href: '/payment-methods' },
          { text: 'Ommaviy oferta', href: '/oferta' }
        ]
      }
    ]
  },
  ru: {
    title: 'Подъём на этаж и разгрузка — тяжёлые грузы | Buildex',
    description:
      'Подъём на этаж и разгрузка тяжёлых и крупных товаров: условия согласуются заранее, о доплате сообщается заранее.',
    h1: 'Подъём на этаж и разгрузка',
    blocks: [
      {
        type: 'p',
        text: 'При доставке цемента, газоблока, плитки, профиля и другого тяжёлого или крупного товара может понадобиться подъём на этаж и разгрузка. Об этой услуге мы договариваемся до заказа.'
      },
      { type: 'h2', text: 'Условия' },
      {
        type: 'kv',
        rows: [
          {
            key: 'Согласование',
            value: 'Подъём на этаж, разгрузка и условия заезда согласуются заранее.'
          },
          {
            key: 'Доплата',
            value:
              'Если за эти услуги есть доплата, о ней сообщается заранее. Обычная стоимость доставки их автоматически не включает.'
          },
          {
            key: 'Итоговая сумма',
            value:
              'До подтверждения заказа в суммах показываются стоимость товара, доставки и выбранных услуг и итог к оплате.'
          }
        ]
      },
      { type: 'h2', text: 'Что нужно сообщить' },
      {
        type: 'list',
        items: [
          'Адрес доставки и этаж.',
          'Есть ли лифт и его размеры; какой подъезд и проход.',
          'Какой товар и сколько: услуга согласуется с учётом веса и объёма.'
        ]
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Входит ли подъём на этаж в стоимость доставки?',
            a: 'Автоматически нет. Подъём и разгрузка тяжёлого или крупного груза согласуются заранее; если есть доплата, о ней сообщается заранее.'
          },
          {
            q: 'Когда я узнаю о доплате?',
            a: 'До подтверждения заказа: стоимость выбранных услуг показывается в итоговой сумме.'
          },
          {
            q: 'Где начать согласование?',
            a: 'Позвоните или напишите в Telegram: назовите адрес и товар.'
          }
        ]
      },
      {
        type: 'cta',
        title: 'Согласуйте подъём',
        text: 'Назовите адрес и товар, условия уточним заранее.',
        buttons: contactButtons('service_cta', { call: 'Позвонить', write: 'Telegram' })
      },
      {
        type: 'links',
        label: 'Ссылки',
        items: [
          { text: 'Доставка', href: '/courier-delivery' },
          { text: 'Способы оплаты', href: '/payment-methods' },
          { text: 'Публичная оферта', href: '/oferta' }
        ]
      }
    ]
  }
};
