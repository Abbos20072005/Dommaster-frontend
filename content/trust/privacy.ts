import type { TrustPageContent, TrustPageSet } from './types';

/**
 * /privacy: the privacy policy, edition 0.1 (v0.3 of the document, 15.10.2026). The text is
 * copied as it is. It exists in Uzbek only: the Russian page shows the same text until the
 * translation is ready.
 */
const uz: TrustPageContent = {
  title: 'Maxfiylik siyosati — Buildex',
  description:
    "Buildex qanday ma'lumot oladi, nima uchun ishlatadi, kimga beradi va qancha saqlaydi. Rozilik va akkauntni o'chirish tartibi.",
  h1: 'Maxfiylik siyosati',
  blocks: [
    { type: 'meta', text: 'Tahrir raqami: 0.1. Kuchga kirish sanasi: 2026-yil 1-noyabr.' },
    {
      type: 'p',
      text: "Ushbu siyosat BUILDEX sayti va Buildex Go ilovalarida ma'lumotlaringiz nima uchun olinishi, qanday ishlatilishi, kimga berilishi va qancha saqlanishini tushuntiradi. Akkauntga kirish, buyurtma bajarilishi, ixtiyoriy Telegram kanali va reklama uchun ishlov berish maqsadlari alohida ko'rib chiqiladi."
    },

    { type: 'h2', text: "1. Ma'lumotlar uchun mas'ul tashkilot" },
    {
      type: 'p',
      text: "1.1. Ma'lumotlar bazasi mulkdori va ishlov berishni tashkil etuvchi operator — «ENERGOSNAB» MChJ, STIR 308542198, manzili: Toshkent shahri, Chilonzor tumani, Arnasoy ko'chasi, 10a-uy, O'zbekiston Respublikasi."
    },
    {
      type: 'p',
      text: "1.2. Ma'lumotlar bo'yicha murojaat telefoni: +998 77 240 09 09. Rasmiy elektron pochta: buildexuz@gmail.com. Elektron so'rov sahifasi: https://buildex.uz/privacy-request. Shaxsga doir ma'lumotlar bo'yicha mas'ul bo'linma yoki shaxs bilan bog'lanish: Shaxsga doir ma'lumotlarni himoya qilish bo'yicha mas'ul xodim — buildexuz@gmail.com, +998 77 240 09 09."
    },
    {
      type: 'p',
      text: "1.3. Siyosat https://buildex.uz/ va Buildex Go Android/iOS ilovalari foydalanuvchilariga, guest checkout xaridorlariga hamda B2B tashkilotlari bilan ishlaydigan jismoniy shaxs vakillariga taalluqli."
    },

    { type: 'h2', text: "2. Qanday ma'lumotlar olinadi" },
    {
      type: 'p',
      text: "2.1. Kirish uchun: telefon raqami, kodni so'rash va tasdiqlash natijasi, rozilik qaydi. Telefon raqami akkauntning asosiy identifikatori sifatida ishlatiladi. Email va doimiy parol yangi telefon orqali kirish oqimining majburiy maydonlari emas."
    },
    {
      type: 'p',
      text: "2.2. Buyurtma uchun: oluvchi ismi, aloqa raqami, buyurtma tarkibi va miqdori, yetkazib berish manzili, tanlangan usul, to'lov holati, tovarni topshirish va qaytarish yozuvlari. Manzil faqat yetkazib berish yoki tegishli xizmat uchun kerak bo'lganda olinadi."
    },
    {
      type: 'p',
      text: "2.3. B2B uchun: tashkilot nomi va rekvizitlari, vakilning ismi, ish aloqa ma'lumotlari va zarur bo'lsa vakolatni tasdiqlashga oid ma'lumot. Oddiy chakana login uchun pasport, JShShIR, biometrik yoki genetik ma'lumot talab qilinmaydi."
    },
    {
      type: 'p',
      text: "2.4. Xavfsizlik va texnik ishlash uchun: sessiya identifikatori, qurilma yoki ilova turi, til, kirish hodisasi va zarur darajadagi tarmoq metama'lumotlari. Texnik identifikatorlar shaxs bilan bog'lash imkonini bersa, ular ham himoyalanishi kerak bo'lgan ma'lumot sifatida ko'rib chiqiladi."
    },
    {
      type: 'p',
      text: "2.5. Telegram ixtiyoriy bog'lansa: Telegram foydalanuvchi identifikatori, chat identifikatori, bog'lash holati va foydalanuvchi ulashgan ma'lumotlar. Akkauntni bog'lash uchun kerak bo'lmagan profil rasmi yoki boshqa ma'lumotlar majburiy yig'ilmaydi."
    },
    {
      type: 'p',
      text: "2.6. Qo'llab-quvvatlashga murojaatda: so'rov mazmuni, aloqa ma'lumotlari va muammoni hal qilish uchun yuborilgan materiallar. Suhbat yozib olinsa, bu haqda suhbat boshlanishida xabar beriladi."
    },
    {
      type: 'p',
      text: "2.7. Ma'lumotlar bevosita sizdan, Platformadagi harakatlaringizdan, to'lov va yetkazib berish hamkorlaridan tegishli maqsad doirasida olinadi. To'lov ma'lumotlariga qaysi tashkilot ishlov berishi to'lov oynasida ko'rsatiladi. Login OTPsi bank yoki karta to'lovini tasdiqlash kodi bilan bir xil vazifani bajarmaydi."
    },

    { type: 'h2', text: '3. Maqsadlar va huquqiy asoslar' },
    {
      type: 'p',
      text: "3.1. Telefon raqami siz so'ragan kirish kodini yuborish, akkauntni ochish yoki sizni mavjud akkauntga kiritish, kirishni himoyalash va xizmat xabarlarini yuborish uchun ishlatiladi. Rozilikka tayanilgan qism uchun rozilik kodni so'rashdan oldin olinadi; so'ralgan xizmat yoki shartnomani bajarish uchun zarur ishlov berish tegishli huquqiy asos bilan ajratiladi."
    },
    {
      type: 'p',
      text: "3.2. Buyurtma ma'lumotlari buyurtmani rasmiylashtirish, qoldiq va narxni tekshirish, to'lovni tasdiqlash, yig'ish, yetkazish, qaytarish va kafolat murojaatini ko'rib chiqish uchun ishlatiladi. Bu maqsadlarda ishlov berish tegishli shartnomani tuzish va bajarish hamda qonuniy majburiyatlarga bog'liq."
    },
    {
      type: 'p',
      text: "3.3. Hisob-kitob, fiskal, soliq va qonun talab qiladigan boshqa yozuvlar tegishli huquqiy majburiyatni bajarish uchun saqlanadi. Bu yozuvlarni saqlashning asosi reklama roziligi emas."
    },
    {
      type: 'p',
      text: "3.4. Telegram orqali kod yoki buyurtma xabarlarini olish alohida tanlov va tegishli rozilik bilan yoqiladi. Kod olish va buyurtma xabarlari maqsadlari alohida tushuntiriladi."
    },
    {
      type: 'p',
      text: "3.5. Reklama, aksiyalar va shaxsiy takliflar faqat tegishli alohida rozilik asosida yuboriladi. Bunday rozilik login yoki buyurtma uchun majburiy shart emas."
    },
    {
      type: 'p',
      text: "3.6. Statistik tahlil imkon qadar shaxsni aniqlash imkonini bermaydigan ma'lumotlar bilan amalga oshiriladi. Akkauntga bog'langan yoki qayta bog'lash mumkin bo'lgan identifikatorlar o'z-o'zidan to'liq anonim ma'lumot hisoblanmaydi. Keraksiz reklama kuzatuvchilari texnik login uchun zarur ma'lumot sifatida qo'shilmaydi."
    },

    { type: 'h2', text: '4. Rozilikni berish va qaytarib olish' },
    {
      type: 'p',
      text: "4.1. Rozilik so'ralganda maqsad, hujjat havolasi va foydalanuvchining harakati ko'rsatiladi. Katakchalar oldindan belgilanmaydi. Bitta interfeys katakchasida bir necha aniq bayonot berilsa, ularning maqsadlari va hujjatlari ochiq ko'rsatiladi."
    },
    {
      type: 'p',
      text: "4.2. Rozilik dalili sifatida hujjat tahriri, foydalanuvchiga ko'rsatilgan bayonot, vaqt, kanal va tasdiqlash natijasi qayd etiladi. OTP muvaffaqiyati telefon kanaliga kirish imkoniyati haqidagi dalildir; u barcha shaxsiy ma'lumotlar maqsadlariga cheksiz rozilik bermaydi."
    },
    {
      type: 'p',
      text: "4.3. Rozilikni u berilgan shaklda yoki yozma, shu jumladan elektron shaklda qaytarib olishingiz mumkin. Telegram bog'lanishini uzish, reklama obunasini bekor qilish va akkauntni o'chirish uchun tegishli sozlama yoki 1.2-banddagi aloqa kanallari ishlatiladi."
    },
    {
      type: 'p',
      text: "4.4. Rozilikka tayanilgan ishlov berish to'xtatiladi va saqlash uchun asos qolmagan ma'lumot o'chiriladi. Mustaqil qonuniy asos bilan saqlanadigan ma'lumot bo'lsa, uning turi, maqsadi va muddati sizga tushuntiriladi. Zarur telefon ishlov berishidan voz kechish shu telefon orqali kirish xizmatini bajara olmasligimizga olib kelishi mumkin."
    },
    {
      type: 'p',
      text: "4.5. Voyaga yetmagan yoki qonuniy vakilning ishtiroki talab etiladigan shaxs uchun rozilik tegishli qonun talab qiladigan shaklda vakil tomonidan beriladi. Bunday holat oddiy OTP bilan avtomatik hal etilgan deb hisoblanmaydi."
    },

    { type: 'h2', text: "5. Kimga ma'lumot berilishi mumkin" },
    {
      type: 'p',
      text: "5.1. BUILDEXning vakolatli xodimlari ma'lumotni faqat o'z vazifasi uchun zarur hajmda oladi. Buyurtmani yig'ish uchun kerak bo'lmagan shaxsiy ma'lumot boshqa xodimlarga umumiy tarzda ochilmaydi."
    },
    {
      type: 'p',
      text: "5.2. SMS provayderiga telefon raqami va yuboriladigan xizmat xabari berilishi mumkin. Provayder: Eskiz.uz (https://eskiz.uz), maxfiylik siyosati provayderning rasmiy saytida e'lon qilingan. Uning xabarlarni saqlash muddati va joylashuvi: provayder bilan shartnomada belgilangan, 90 kundan oshmaydigan muddat; ma'lumotlar O'zbekiston Respublikasi hududidagi serverlarda saqlanadi."
    },
    {
      type: 'p',
      text: "5.3. To'lov tashkilotlari buyurtma to'lovi uchun zarur ma'lumotni oladi. Amaldagi tashkilotlar va ularning siyosatlari: Payme (https://payme.uz), Click (https://click.uz), Uzum Bank (https://uzumbank.uz), Atmos (https://atmos.uz/); har birining maxfiylik siyosati o'z rasmiy saytida e'lon qilingan. Bank/karta tasdiqlash kodlari BUILDEXning akkauntga kirish jurnallariga qo'shilmaydi."
    },
    {
      type: 'p',
      text: "5.4. Yetkazib berish yoki olib ketish xizmatlari oluvchining aloqa va topshirish uchun zarur ma'lumotlarini oladi. Amaldagi hamkorlar: BUILDEXning o'z yetkazib berish xizmati hamda shartnoma asosida jalb qilingan kuryer hamkorlari; to'liq ro'yxat: https://buildex.uz/privacy/partners. Har bir hamkorning ishlov berish vazifasi, ma'lumot toifasi va aloqa kanali rasmiy ro'yxatda ko'rsatiladi."
    },
    {
      type: 'p',
      text: "5.5. Hosting, texnik xizmat, ERP/1C va boshqa amaldagi xizmat yetkazib beruvchilar bilan ma'lumotga kirish hamda himoya shartlari belgilanadi. Ularning rasmiy ro'yxati va ishlov berish hududi: hosting — O'zbekistondagi data-markaz (7.1-band); ERP/1C — BUILDEX ichki serverlari (O'zbekiston); to'liq ro'yxat va ishlov berish hududlari: https://buildex.uz/privacy/partners."
    },
    {
      type: 'p',
      text: "5.6. Vakolatli organlarga ma'lumot qonuniy talab va tegishli vakolat doirasida berilishi mumkin. Tijorat yoki reklama uchun ma'lumotga qo'shimcha ishlov berish alohida asos bo'lmasa amalga oshirilmaydi."
    },
    {
      type: 'p',
      text: "5.7. Uchinchi shaxsga berish haqida qonun talab qiladigan yozma xabarnoma tegishli tartib va muddatda yuboriladi. Amaldagi oluvchilar haqida axborot so'rash huquqingiz saqlanadi."
    },

    { type: 'h2', text: '6. Telegramdagi ikki xil foydalanish' },
    {
      type: 'p',
      text: "6.1. Shaxsiy Telegram kanali. Siz «Telegram orqali kod olish» yoki «Telegramda buyurtma xabarlari» imkoniyatini tanlasangiz, mos maqsad uchun Telegramdagi shaxsiy chatdan foydalaniladi. Bot: @buildexorder_bot (https://t.me/buildexorder_bot). Telegram boshqa tashkilotning servisidir; uning maxfiylik siyosati: https://telegram.org/privacy."
    },
    {
      type: 'p',
      text: "6.2. Ushbu kanalga oid bayonotda akkauntni bog'lash ma'lumotlari va xabar tarkibi ko'rsatiladi. Bog'lanishni uzsangiz, keyingi xabarlar ushbu kanal orqali yuborilmaydi. BUILDEXning saqlash tartibi Telegram yoki foydalanuvchi qurilmasidagi barcha nusxalarni boshqarish imkoniyati borligini anglatmaydi."
    },
    {
      type: 'p',
      text: "6.3. Xodimlar Telegram guruhi. Buyurtmalarni bajarishda xodimlar guruhi ishlatilsa, u mijozning shaxsiy bot kanalidan boshqa ishlov berish hisoblanadi. Ma'lumotlarni shu guruhga chiqarishga oid tartib: guruh ishlatiladi. Guruhga faqat buyurtma raqami, tarkibi, yetkazish tumani va vaqti hamda niqoblangan telefon raqami (+998 ** *** 12 34) chiqariladi. To'liq ism, telefon va manzil faqat buyurtma tizimida, buyurtmaga biriktirilgan operator va kuryerga ko'rsatiladi. Guruh a'zolari — faqat buyurtmani bajaruvchi vakolatli xodimlar. Guruhdagi xabarlar 30 kundan keyin o'chiriladi. Huquqiy asos — buyurtma shartnomasini bajarish."
    },
    {
      type: 'p',
      text: "6.4. Shaxsiy Telegram botiga bergan roziligingiz ism, to'liq telefon raqami yoki manzilni xodimlar guruhiga chiqarishga avtomatik rozilik bermaydi. Har bir foydalanish uchun tegishli asos va zarur axborot taqdim etilishi kerak."
    },
    {
      type: 'p',
      text: "6.5. Telegramning chet elda saqlash yoki ishlov berishiga taalluqli talablar alohida tekshiriladi. Ixtiyoriy kanalga rozilik ushbu talablarning hammasi bajarilganligi haqidagi da'vo o'rnini bosmaydi."
    },

    { type: 'h2', text: "7. Ma'lumotlarning joylashuvi" },
    {
      type: 'p',
      text: "7.1. BUILDEXning mijozlar bo'yicha asosiy ma'lumotlar bazasi O'zbekiston Respublikasi hududidagi serverlarda saqlanadi. Asosiy hosting tashkiloti: Airnet (Toshkent)."
    },
    {
      type: 'p',
      text: "7.2. Zaxira nusxa, monitoring, SMS, Telegram va boshqa tashqi xizmatlar asosiy serverdan boshqa joyda ma'lumot saqlashi yoki unga ishlov berishi mumkin. Ularning joylashuvi va huquqiy mexanizmi 5-bo'limdagi ro'yxatda aniq ko'rsatiladi: zaxira nusxalar va SMS — O'zbekiston hududida; Telegram — Telegram serverlarida (xorijda), faqat foydalanuvchining ixtiyoriy tanlovi bilan; monitoring — shaxsiy ma'lumotlarsiz texnik ko'rsatkichlar. To'liq ro'yxat: https://buildex.uz/privacy/partners."
    },
    {
      type: 'p',
      text: "7.3. O'zbekiston hududida saqlanishi majburiy bo'lgan toifalar uchun tegishli talablar bajariladi. Boshqa ma'lumotga chet elda ishlov berish ham qonunda belgilangan shartlarga muvofiq tashkil etiladi. «Asosiy server O'zbekistonda» degan ma'lumot barcha tashqi servislar mahalliy ekanligini anglatmaydi."
    },
    {
      type: 'p',
      text: "7.4. Davlat reyestrida ro'yxatdan o'tkazish masalasi ishlov beriladigan ma'lumot toifalari va amaldagi talablar bo'yicha aniqlanadi. Tegishli baza uchun ro'yxatdan o'tish talab etilsa, uning rekvizitlari ko'rsatiladi. Ro'yxatdan o'tish holati yoki asoslangan tatbiq etilmaslik xulosasi: BUILDEX mijozlar ma'lumotlar bazasi Shaxsga doir ma'lumotlar bazalari davlat reyestrida ro'yxatdan o'tkaziladi; ro'yxat raqami va sanasi ro'yxatdan o'tgach shu bandda e'lon qilinadi."
    },

    { type: 'h2', text: '8. Saqlash muddatlari' },
    {
      type: 'p',
      text: "8.1. Ma'lumotlar belgilangan maqsad yoki mustaqil qonuniy majburiyat uchun zarur muddat davomida saqlanadi. Quyidagi muddatlar yakuniy siyosatga kiritiladi; tegishli muddat tugagach ma'lumot o'chiriladi yoki qayta shaxsga bog'lab bo'lmaydigan tarzda egasizlantiriladi."
    },
    {
      type: 'table',
      head: ["Ma'lumot", 'Saqlash tartibi va muddati'],
      rows: [
        [
          'Bir martalik kodni tekshirish siri',
          "Kod amal qiladigan qisqa davr; foydalanilgach yoki muddati tugagach bekor qilinadi. Aniq muddat: 2 daqiqa. Oddiy jurnalda ochiq kod saqlanmaydi."
        ],
        [
          'SMS yoki Telegram yuborish jurnali',
          "Xabar identifikatori, kanal, vaqt va holat. OTP matnisiz. Muddat: 90 kun. Provayderdagi nusxalar muddati ham alohida ko'rsatiladi."
        ],
        [
          'Kirish va xavfsizlik hodisalari',
          "Zarur metama'lumotlar, cheklangan kirish. Muddat: 1 oy."
        ],
        [
          'Profil va saqlangan manzillar',
          "Akkaunt xizmatidan foydalanish uchun zarur davr; o'chirish so'rovi bajarilganda mustaqil saqlash asosi bo'lmagan qismi o'chiriladi."
        ],
        [
          'Rozilik va aksept dalillari',
          "Tegishli xizmat/shartnoma va dalilni saqlash uchun asoslangan davr. Akkaunt yopilgandan keyingi muddat: 3 yil."
        ],
        [
          "Buyurtma to'lov va hisob hujjatlari",
          "Tegishli hujjat uchun qonun talab qiladigan muddat. Hujjat turi bo'yicha ro'yxat va muddat: birlamchi buxgalteriya, fiskal hujjatlar va hisob-fakturalar — kamida 5 yil (buxgalteriya va soliq qonunchiligi talabi bo'yicha)."
        ],
        [
          "Telegram bog'lanishi",
          "Tanlangan kanal faol bo'lgan davr; uzilgach foydalanish to'xtaydi. Bog'lanish yozuvini o'chirish muddati: uzilgandan keyin 30 kun."
        ],
        [
          'Reklama obunasi',
          "Rozilik faol bo'lgan davr. Bekor qilish dalili uchun minimal saqlash muddati: bekor qilingandan keyin 3 yil."
        ],
        [
          'Support yozuvlari va texnik nusxalar',
          "So'rov turi hamda zaruriyatga mos muddat: so'rov yopilgandan keyin 12 oy. Zaxira nusxadan chiqib ketish muddati: 35 kun."
        ]
      ]
    },
    {
      type: 'p',
      text: "8.2. Asosli nizo yoki qonuniy saqlash talabi bo'lsa, faqat tegishli ma'lumotlar kerakli davrga saqlanadi. Bunday asos boshqa ma'lumotlarni muddatsiz saqlashga ruxsat sifatida ishlatilmaydi."
    },
    {
      type: 'p',
      text: "8.3. Provayder yoki Telegram foydalanuvchisi saqlaydigan nusxaga BUILDEX bevosita egalik qilmasligi mumkin. Uchinchi tomon nusxalari bo'yicha amaliy imkoniyat va cheklovlar so'rovga javobda tushuntiriladi."
    },

    { type: 'h2', text: "9. Huquqlar va akkauntni o'chirish" },
    {
      type: 'p',
      text: "9.1. Siz ma'lumotlaringizga ishlov berilganligini, uning asosi, maqsadi, tarkibi, oluvchilari va saqlash muddatini bilish, noto'g'ri ma'lumotni tuzatish, tegishli hollarda ishlovni to'xtatish yoki ma'lumotni o'chirishni talab qilish huquqiga egasiz."
    },
    {
      type: 'p',
      text: "9.2. O'chirish so'rovi ilovada Profil → «Akkauntni o'chirish» orqali yoki ochiq veb-sahifa orqali yuboriladi: https://buildex.uz/account/delete. Muqobil kanal — 1.2-banddagi rasmiy aloqa vositalari. Guest checkout mijozlari ham o'z ma'lumotlariga oid so'rov yuborishi mumkin."
    },
    {
      type: 'p',
      text: "9.3. Begona shaxsning ma'lumotini o'chirishga yo'l qo'ymaslik uchun so'rovga vakolat tekshiriladi. Odatda telefon kodidan foydalaniladi; telefonga kirish yo'qolgan bo'lsa, holatga mos muqobil tekshiruv va yordam tartibi qo'llanadi."
    },
    {
      type: 'p',
      text: "9.4. So'rovni qabul qilish, bajarish va sizga javob berish tartibi: so'rov 1 ish kuni ichida ro'yxatga olinadi va 10 ish kuni ichida bajariladi; javob SMS, elektron pochta yoki so'rov kelgan kanal orqali yuboriladi. Qonun belgilagan majburiy muddatlar saqlanadi. Yakunlangach qaysi ma'lumot o'chirilgani, qaysisi qanday asos va muddat bilan qolganligi haqida axborot beriladi."
    },
    {
      type: 'p',
      text: "9.5. Akkauntdan foydalanish tugatiladi, faol sessiyalar bekor qilinadi, ixtiyoriy xabarlar to'xtatiladi va saqlash uchun asos qolmagan profil ma'lumotlari o'chiriladi. Faqat akkauntni vaqtincha bloklash ushbu so'rovning bajarilgani hisoblanmaydi."
    },
    {
      type: 'p',
      text: "9.6. Faol buyurtma yoki qaytarish mavjud bo'lsa, so'rov qabul qilinadi va shu jarayon uchun zarur ma'lumotning alohida ishlov berish asosi tushuntiriladi. Buxgalteriya yoki boshqa majburiy hujjatlar ichidagi ma'lumotning saqlanishi profilni cheklanmagan tarzda saqlashga ruxsat bermaydi."
    },
    {
      type: 'p',
      text: "9.7. Xizmat yetkazib beruvchilarga tegishli o'chirish yoki cheklash topshirig'i yuboriladi. Zaxira nusxalar amaldagi aylanish muddati bo'yicha tozalanadi; tiklash jarayonida avval o'chirilgan profil yoki reklama roziligi qayta faol holatga keltirilmaydi."
    },
    {
      type: 'p',
      text: "9.8. Shu raqam bilan keyinchalik yana ro'yxatdan o'tilsa, yangi akkaunt va tegishli yangi rozilik qaydlari yaratiladi. Eski profil, tarix yoki Telegram bog'lanishi avtomatik tiklanmaydi. Alohida qonuniy saqlanadigan buyurtma yozuvlari yangi akkauntga tekshiruvsiz ochilmaydi."
    },
    {
      type: 'p',
      text: "9.9. Huquqlaringiz buzilgan deb hisoblasangiz, shaxsga doir ma'lumotlar sohasidagi vakolatli organga yoki sudga murojaat qilishingiz mumkin. BUILDEXga avval murojaat qilish bunday huquqni cheklamaydi."
    },

    { type: 'h2', text: '10. Himoya va texnik vositalar' },
    {
      type: 'p',
      text: "10.1. BUILDEX ma'lumotga kirishni vazifaga qarab cheklaydi, uzatish va saqlash xavfsizligini ta'minlash uchun mos texnik hamda tashkiliy choralarni belgilaydi. Kirish OTPsi, sessiya tokenlari va boshqa maxfiy qiymatlar ochiq amaliy jurnallarga yoki xodimlar guruhlariga chiqarilmaydi."
    },
    {
      type: 'p',
      text: "10.2. Ma'lumotlar bazasi, zaxira nusxalari va tashqi servislar uchun alohida himoya va kirish qoidalari qo'llanadi. Xavfsizlik hodisasi yuz bersa, uning oqibatlari va zarur choralar amaldagi majburiyatlarga muvofiq ko'rib chiqiladi."
    },
    {
      type: 'p',
      text: "10.3. Sessiya va xavfsizlik uchun zarur cookie yoki mobil identifikatorlar Platformaning ishlashini ta'minlaydi. Qo'shimcha analitika/reklama vositalari va ularni boshqarish tartibi: Google Analytics 4, Firebase Analytics/Crashlytics, Meta Pixel. Analitika va reklama vositalari faqat cookie bannerida yoki ilovadagi Profil → «Maxfiylik» sozlamasida rozilik berilgandan keyin yoqiladi va istalgan vaqtda o'chirilishi mumkin."
    },

    { type: 'h2', text: '11. Siyosatning yangilanishi' },
    {
      type: 'p',
      text: "11.1. Siyosatning raqami va kuchga kirish sanasi ko'rsatiladi. Muhim o'zgarishlar foydalanuvchiga tushunarli tarzda bildiriladi; yangi maqsadga oid rozilik kerak bo'lsa, u shu maqsad boshlanishidan oldin olinadi."
    },
    {
      type: 'p',
      text: "11.2. Siyosatdagi yangi bayonot ilgari olinmagan rozilikni orqaga qarab yaratmaydi. Hujjatning qabul qilingan tahriri va rozilik dalili tegishli saqlash muddatiga muvofiq saqlanadi."
    },
    {
      type: 'p',
      text: "11.3. Oferta va ushbu siyosat bir-birini to'ldiradi. Maxfiylik siyosati bilan tanishganlik barcha ixtiyoriy ishlov berish maqsadlariga rozilik yoki qonundagi majburiy huquqlardan voz kechish hisoblanmaydi."
    }
  ]
};

export const privacyPage: TrustPageSet = {
  uz,
  ru: {
    ...uz,
    title: 'Политика конфиденциальности — Buildex',
    description:
      'Какие данные собирает Buildex, зачем, кому передаёт и сколько хранит. Согласие и удаление аккаунта.'
  }
};
