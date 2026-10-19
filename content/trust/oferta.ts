import type { TrustPageContent, TrustPageSet } from './types';

/**
 * /oferta: the public offer, edition 0.1 (v0.3 of the document, 15.10.2026). The text is copied
 * as it is. It exists in Uzbek only: the Russian page shows the same text until the translation
 * is ready.
 */
const uz: TrustPageContent = {
  title: 'Ommaviy oferta — Buildex',
  description:
    "Buildex sayti va ilovasida akkauntdan foydalanish va tovar sotib olish shartlari: buyurtma, to'lov, yetkazib berish, qaytarish.",
  h1: 'Ommaviy oferta',
  blocks: [
    { type: 'meta', text: "Tahrir raqami: 0.1. Kuchga kirish sanasi: 2026-yil 1-noyabr." },
    {
      type: 'p',
      text: "Ushbu hujjat BUILDEX sayti va Buildex Go mobil ilovalarida akkauntdan foydalanish hamda BUILDEX'dan tovar sotib olish shartlarini belgilaydi. Kirish uchun bildirilgan rozilik akkauntdan foydalanishga taalluqli. Muayyan tovar bo'yicha oldi-sotdi majburiyati esa buyurtmani tasdiqlash orqali yuzaga keladi."
    },

    { type: 'h2', text: "1. Tomonlar va qo'llanilish doirasi" },
    {
      type: 'p',
      text: "1.1. Platforma egasi va tovar sotuvchisi — «ENERGOSNAB» MChJ, STIR 308542198, manzili: O'zbekiston Respublikasi, Toshkent shahri, Chilonzor tumani, Arnasoy ko'chasi, 10a-uy. Keyingi o'rinlarda — BUILDEX yoki Sotuvchi."
    },
    {
      type: 'p',
      text: "1.2. Platforma — https://buildex.uz/ sayti va Buildex Go Android/iOS mobil ilovalari. Foydalanuvchi — Platformadan foydalanadigan jismoniy shaxs yoki yuridik shaxsning vakili. Xaridor — buyurtma beradigan jismoniy yoki yuridik shaxs."
    },
    {
      type: 'p',
      text: "1.3. Tovarlar ushbu ofertada Sotuvchi sifatida ko'rsatilgan BUILDEX tomonidan sotiladi. Boshqa shaxs sotuvchi bo'lgan xizmat joriy etilsa, uning nomi va tegishli shartlar buyurtmadan oldin alohida ko'rsatiladi."
    },
    {
      type: 'p',
      text: "1.4. Shaxsiy ehtiyojlari uchun tovar xarid qiladigan iste'molchilarning qonun bilan kafolatlangan huquqlari saqlanadi. Tadbirkorlik maqsadidagi B2B/PRO xaridlarga tegishli shartnoma va qonunchilik qo'llanadi."
    },
    {
      type: 'p',
      text: "1.5. Akkaunt ochish orqali pullik obuna, kredit yoki kelajakdagi xaridni amalga oshirish majburiyati yuzaga kelmaydi. Tovar va pullik xizmatlarning narxi ular tanlanganida alohida ko'rsatiladi."
    },

    { type: 'h2', text: '2. Oferta bilan tanishish va uni qabul qilish' },
    {
      type: 'p',
      text: "2.1. Foydalanuvchi oferta va Maxfiylik siyosatini telefon raqamini yuborish hamda buyurtma berishdan oldin ochib o'qishi mumkin. Matnlar ro'yxatdan o'tmagan tashrif buyuruvchi uchun ham ochiq bo'ladi."
    },
    {
      type: 'p',
      text: "2.2. Akkauntdan foydalanish shartlari foydalanuvchi tegishli rozilik katakchasini belgilab, telefon raqamiga yuborilgan bir martalik kodni muvaffaqiyatli tasdiqlaganida qabul qilinadi. Telefon raqamiga ishlov berish va kod yuborishga oid rozilik kodni so'rashdan oldin olinadi."
    },
    {
      type: 'p',
      text: "2.3. Rozilik katakchasi oldindan belgilanmaydi. Oferta matnini ochish, telefon raqamini faqat maydonga yozish yoki katalogni ko'rishning o'zi aksept deb hisoblanmaydi."
    },
    {
      type: 'p',
      text: "2.4. Muayyan buyurtmaga oid aksept Xaridor tovar, miqdor, yakuniy summa, to'lov va yetkazib berish shartlarini ko'rib, tegishli katakchani belgilab «Buyurtmani tasdiqlash» tugmasini bosganida hamda ushbu elektron xabar Sotuvchi tizimiga kelib tushganida amalga oshiriladi. Oldi-sotdi shartnomasi shu paytda tuziladi."
    },
    {
      type: 'p',
      text: "2.5. Xaridor tasdiqlashdan oldin buyurtma ma'lumotlarini o'zgartirishi yoki rasmiylashtirishni to'xtatishi mumkin. Aksept xabari Sotuvchiga kelib tushishidan oldin yoki u bilan bir vaqtda qaytarib olish xabari kelib tushsa, aksept qaytarib olingan hisoblanadi. Shartnoma tuzilgach bekor qilish ushbu ofertaning 8-bo'limiga muvofiq amalga oshiriladi."
    },
    {
      type: 'p',
      text: "2.6. Sotuvchi qabul qilingan hujjat tahriri, rozilik vaqti, kanal va tasdiqlash natijasini qayd etadi. Buyurtma shartlari va uni tasdiqlash haqidagi ma'lumot Xaridorga elektron ko'rinishda taqdim etiladi. Oddiy kirish OTPsi o'z-o'zidan elektron raqamli imzo, yuridik shaxs vakolati yoki barcha kelajakdagi xaridlarga rozilik sifatida talqin qilinmaydi."
    },

    { type: 'h2', text: '3. Telefon raqami va bir martalik kod' },
    {
      type: 'p',
      text: "3.1. Telefon raqami akkauntning asosiy kirish identifikatoridir. Elektron pochta va doimiy parol yangi kirish oqimida talab qilinmaydi. Qo'shimcha aloqa ma'lumotlari zarur bo'lganda alohida so'raladi."
    },
    {
      type: 'p',
      text: "3.2. Foydalanuvchi o'zi foydalanishga vakolatli bo'lgan va nazorat qiladigan telefon raqamini kiritadi. Bir martalik kod — shu raqam yoki oldindan xavfsiz bog'langan tasdiqlash kanaliga kirish imkoniyatini tekshirish vositasidir."
    },
    {
      type: 'p',
      text: "3.3. Akkaunt mavjud bo'lmasa, kod muvaffaqiyatli tasdiqlangach yangi akkaunt yaratiladi. Mavjud bo'lsa, foydalanuvchi o'sha akkauntga kiradi. Telefon raqamining bir xil yozilishi uning turli shakllarda takroran akkaunt ochishiga olib kelmasligi kerak."
    },
    {
      type: 'p',
      text: "3.4. Kodning amal qilish vaqti va qayta yuborish imkoniyati tasdiqlash ekranida ko'rsatiladi. Ishlatilgan yoki muddati tugagan kod bilan kirib bo'lmaydi. Noto'g'ri urinishlar yoki suiiste'mol holatida kod so'rash vaqtincha cheklanishi mumkin."
    },
    {
      type: 'p',
      text: "3.5. Foydalanuvchi kirish kodini boshqa shaxslarga, jumladan o'zini BUILDEX xodimi deb tanishtirgan shaxsga bermasligi kerak. BUILDEX xodimlari akkauntga kirish OTPsini so'ramaydi. Tovarni topshirish uchun alohida kod ishlatilsa, xabarda uning vazifasi aniq ko'rsatiladi."
    },
    {
      type: 'p',
      text: "3.6. Telefon yoki SIM-karta yo'qolsa, raqam boshqa shaxsga o'tsa yoki ruxsatsiz kirish gumoni bo'lsa, foydalanuvchi qo'llab-quvvatlash xizmatiga murojaat qiladi. BUILDEX akkauntga kirishni tiklash yoki raqamni almashtirishdan oldin vaziyatga mos tekshiruv o'tkazadi. Begona raqamni yozishning o'zi oldingi buyurtmalarni ko'rish huquqini bermaydi."
    },
    {
      type: 'p',
      text: "3.7. Foydalanuvchi o'z qurilmasi va kod maxfiyligini asraydi. Bu talab BUILDEX'ning axborot xavfsizligi bo'yicha majburiyatlarini bekor qilmaydi va har qanday ruxsatsiz amal uchun javobgarlikni avtomatik ravishda foydalanuvchiga yuklamaydi."
    },

    { type: 'h2', text: '4. Telegram va xizmat xabarlari' },
    {
      type: 'p',
      text: "4.1. SMS asosiy tasdiqlash kanalidir. Telegram orqali zaxira kod olish yoki buyurtma xabarlariga obuna bo'lish ixtiyoriy. Ushbu kanal foydalanuvchiga tegishli rozilik va xavfsiz bog'lash jarayonidan keyin taklif etiladi."
    },
    {
      type: 'p',
      text: "4.2. Telegram tanlanganda foydalanuvchiga bot nomi, uzatiladigan ma'lumotlar, foydalanish maqsadi va uchinchi tomon servisi haqidagi axborot ko'rsatiladi. Ushbu kanalga rozilik umumiy login yoki xarid katakchasiga yashirin qo'shilmaydi."
    },
    {
      type: 'p',
      text: "4.3. Telegram akkauntini bog'lash buyurtma ma'lumotlarini xodimlarning Telegram guruhlariga yuborishga yoki reklamaga avtomatik rozilik hisoblanmaydi. Xodimlar foydalanadigan tashqi servislar orqali ma'lumot berish tartibi Maxfiylik siyosatida alohida yoritiladi."
    },
    {
      type: 'p',
      text: "4.4. Telegram bog'lanishini uzish akkauntni o'chirmaydi. Foydalanuvchi mavjud boshqa kirish kanalidan foydalanishi mumkin. Telegramning o'z xizmatlari uning alohida foydalanish va maxfiylik shartlariga bo'ysunadi."
    },
    {
      type: 'p',
      text: "4.5. Kirish kodi, buyurtma holati, to'lov, yetkazib berish va xavfsizlik xabarlari xizmat xabarlaridir. Reklama va aksiyalar haqidagi xabarlar alohida ixtiyoriy rozilik asosida yuboriladi; ulardan voz kechish xarid qilish imkoniyatini cheklamaydi."
    },

    { type: 'h2', text: "5. Ro'yxatdan o'tishsiz xarid va B2B" },
    {
      type: 'p',
      text: "5.1. Ro'yxatdan o'tish uchun alohida ekran talab qilinmaydigan xaridda ham buyurtma uchun zarur telefon, oluvchi va yetkazib berish ma'lumotlari so'raladi. Tasdiqlashdan oldin foydalanuvchiga buyurtma raqamga bog'langan texnik hisob yozuvida saqlanishi bildiriladi."
    },
    {
      type: 'p',
      text: "5.2. Telefon tasdiqlanmagan bo'lsa, bunday hisob yozuvi boshqa akkauntning buyurtma tarixi yoki shaxsiy ma'lumotlariga kirish huquqini bermaydi. Oldingi buyurtmalarga kirish va akkauntni boshqarish uchun telefon yoki muqobil xavfsiz kanal orqali tasdiqlash talab qilinadi."
    },
    {
      type: 'p',
      text: "5.3. Guest checkout'dagi rozilik reklama obunasi yoki Telegram bog'lanishini avtomatik yoqmaydi."
    },
    {
      type: 'p',
      text: "5.4. Yuridik shaxs vakili o'z vakolati doirasida harakat qiladi va tashkilot rekvizitlarini buyurtmani rasmiylashtirishda taqdim etadi. Telefon OTPsi tashkilot nomidan shartnoma tuzish vakolatini o'z-o'zidan tasdiqlamaydi."
    },
    {
      type: 'p',
      text: "5.5. PRO maqomi, individual narx, kechiktirilgan to'lov yoki maxsus yetkazib berish faqat alohida tasdiqlangan shartlar asosida beriladi. PRO belgisi o'z-o'zidan kredit limiti yaratmaydi. Alohida B2B shartnomasi bo'lsa, tegishli tijorat shartlari o'sha shartnomada belgilanadi."
    },

    { type: 'h2', text: "6. Tovar narxi va to'lov" },
    {
      type: 'p',
      text: "6.1. Tovar nomi, muhim xususiyatlari, o'lchov birligi, miqdori va narxi tovar sahifasi hamda buyurtma xulosasida ko'rsatiladi. Metr, dona, qop, kilogramm yoki boshqa birlikdagi narx Xaridorga tushunarli ko'rinishda beriladi."
    },
    {
      type: 'p',
      text: "6.2. Tasdiqlashdan oldin tovar summasi, chegirma, yetkazib berish, ko'tarish yoki boshqa tanlangan xizmatlar qiymati va jami to'lov UZSda ko'rsatiladi. Soliqlar hamda qo'shimcha to'lovlarning summaga kiritilgan yoki alohida hisoblanganligi tushuntiriladi."
    },
    {
      type: 'p',
      text: "6.3. Faqat shu buyurtma uchun mavjud to'lov usullari taklif etiladi. To'lov muddati va oldindan to'lash talabi buyurtma tasdiqlanishidan oldin ko'rsatiladi. Muddatli to'lov yoki moliyalashtirish taklif etilsa, u alohida shartlar asosida rasmiylashtiriladi."
    },
    {
      type: 'p',
      text: "6.4. Tasdiqlangan buyurtma narxi Xaridorning roziligisiz oshirilmaydi. Tovar mavjudligi yoki narxida xato aniqlansa, Sotuvchi muammoni tushuntiradi va qonuniy yechimni kelishadi. Boshqa tovar bilan almashtirish yoki qo'shimcha haq undirish uchun Xaridorning alohida roziligi olinadi."
    },
    {
      type: 'p',
      text: "6.5. Yetkazib berish imkonsiz bo'lsa yoki buyurtma qonuniy asosda bekor qilinsa, bajarilmagan qism uchun olingan pul qaytariladi. To'lovning muvaffaqiyatli holati to'lov tizimidan kelgan tasdiq bilan aniqlanadi; takroriy yechish aniqlansa, Sotuvchi uni tekshirish va bartaraf etish uchun murojaatni qabul qiladi."
    },
    {
      type: 'p',
      text: "6.6. Xaridorga tegishli chek va boshqa zarur savdo hujjatlari qonunchilikka muvofiq taqdim etiladi. To'lov rekvizitlari faqat rasmiy buyurtma yoki rasmiy aloqa kanali orqali beriladi."
    },

    { type: 'h2', text: '7. Yetkazib berish va qabul qilish' },
    {
      type: 'p',
      text: "7.1. Yetkazib berish hududi, narxi, kutilayotgan muddati yoki vaqt oralig'i va mavjud olib ketish nuqtasi buyurtmadan oldin ko'rsatiladi. Xaridor shu buyurtma uchun taklif etilgan usulni tanlaydi."
    },
    {
      type: 'p',
      text: "7.2. Og'ir yoki yirik yuklar uchun qavatga ko'tarish, tushirish, kirish sharoiti va tegishli qo'shimcha haq bo'lsa, oldindan kelishiladi. Oddiy yetkazib berish narxi ushbu xizmatlarning barchasini qamrab oladi deb avtomatik hisoblanmaydi."
    },
    {
      type: 'p',
      text: "7.3. Yetkazish muddati buzilishi xavfi aniqlansa, Sotuvchi Xaridorni xabardor qiladi va muqobil muddat yoki qonuniy bekor qilish tartibini taklif etadi. Bu xabar Xaridorning qonuniy talablarini bekor qilmaydi."
    },
    {
      type: 'p',
      text: "7.4. Xaridor tovarni olayotganda imkon qadar miqdor, ko'rinadigan holat va butlikni tekshiradi; aniqlangan tafovutni qo'llab-quvvatlash xizmatiga bildiradi. Tovarni qabul qilganlik yashirin nuqson yoki kafolat bo'yicha huquqlardan voz kechish hisoblanmaydi."
    },
    {
      type: 'p',
      text: "7.5. Tovar topshirilganligi tegishli hujjat yoki elektron tasdiq bilan qayd etiladi. Tovar Xaridorga yoki u ko'rsatgan oluvchiga amalda topshirilguncha Sotuvchi o'z zimmasidagi yetkazib berish majburiyatlari uchun javob beradi."
    },

    { type: 'h2', text: '8. Bekor qilish, qaytarish va kafolat' },
    {
      type: 'p',
      text: "8.1. Buyurtmani o'zgartirish yoki bekor qilish uchun Xaridor buyurtma raqami bilan qo'llab-quvvatlash xizmatiga yoki mavjud shaxsiy kabinet funksiyasiga murojaat qiladi. So'rov buyurtmaning bajarilgan bosqichi va qonuniy huquqlar hisobga olingan holda ko'rib chiqiladi."
    },
    {
      type: 'p',
      text: "8.2. Iste'molchi maqbul sifatli nooziq-ovqat tovarini qonunda nazarda tutilgan shartlar bilan xarid qilgan kundan boshlab o'n kun ichida ayni shunday tovarga almashtirishni, bunday tovar sotuvda bo'lmasa pulini qaytarishni talab qilishi mumkin. Hukumat belgilagan almashtirilmaydigan tovarlar ro'yxati hisobga olinadi."
    },
    {
      type: 'p',
      text: "8.3. Nuqsonli, noto'g'ri yoki to'liq bo'lmagan tovar bo'yicha almashtirish, nuqsonni bartaraf etish, narxni kamaytirish yoki shartnomani bekor qilish talablari tegishli qonunchilik bo'yicha ko'rib chiqiladi. Maqbul sifatli tovar uchun istisno nuqsonli tovar bo'yicha qonuniy talablarni avtomatik bekor qilmaydi."
    },
    {
      type: 'p',
      text: "8.4. Kafolat muddati va undan foydalanish tartibi tovar hujjatida yoki tegishli sahifada ko'rsatiladi. Faqat chek yo'qolganligi sababli, xaridni tasdiqlovchi boshqa asoslar mavjud bo'lsa, qonuniy talab avtomatik rad etilmaydi."
    },
    {
      type: 'p',
      text: "8.5. Pul odatda to'langan usul bilan qaytariladi; boshqa usul qonun doirasida kelishiladi. Qaytarish bilan bog'liq pul o'tkazish xarajatlari Sotuvchi zimmasida bo'ladi. Tovarni ortga tashish xarajatlari qaytarish sababi va qonunchilikka muvofiq belgilanadi."
    },
    {
      type: 'p',
      text: "8.6. Qaytarish bo'yicha murojaat kanali: ushbu ofertaning 12-bo'limi. Qaytarish manzili: Toshkent shahri, Chilonzor tumani, Arnasoy ko'chasi, 10a-uy yoki buyurtmada ko'rsatilgan BUILDEX olib ketish nuqtasi; yirik tovarlar uchun Sotuvchi tomonidan olib ketish kelishiladi. Murojaatni ko'rib chiqish va pulni qaytarish operatsion muddati: murojaat 3 ish kuni ichida ko'rib chiqiladi, qaytarish to'g'risida qaror qabul qilingach pul 10 kalendar kuni ichida qaytariladi (bank yoki to'lov tizimi orqali o'tish vaqti bundan mustasno); qonundagi majburiy muddatlar ustun. Xaridorga qabul qilingan qaror, summa va qaytarish holati bildiriladi."
    },
    {
      type: 'p',
      text: "8.7. Qo'shimcha uzaytirilgan qaytarish dasturi bo'lsa, uning tovarlari, muddati va shartlari alohida e'lon qilinadi. Bunday dastur qonuniy minimumdan kam huquq bermasligi kerak."
    },

    { type: 'h2', text: "9. Ma'lumotlarga ishlov berish va akkauntni o'chirish" },
    {
      type: 'p',
      text: "9.1. Shaxsga doir ma'lumotlarning tarkibi, ishlov berish maqsadlari, huquqiy asoslari, oluvchilar, saqlash muddatlari va foydalanuvchi huquqlari alohida Maxfiylik siyosatida ko'rsatiladi. Keraksiz yoki alohida maqsadga taalluqli ma'lumotlar umumiy aksept asosida cheklanmagan tarzda yig'ilmaydi."
    },
    {
      type: 'p',
      text: "9.2. Foydalanuvchi rozilikka asoslangan ishlov berish uchun roziligini qaytarib olishi va akkauntni o'chirishni so'rashi mumkin. Ilovada profil orqali, veb-sahifa yoki qo'llab-quvvatlash xizmati orqali so'rov berish imkoniyati ta'minlanadi. Akkauntni o'chirish sahifasi: https://buildex.uz/account/delete."
    },
    {
      type: 'p',
      text: "9.3. O'chirishdan oldin so'rov bergan shaxsning akkauntga vakolati tekshiriladi. Faol buyurtma bo'lsa, uning bajarilishi, bekor qilinishi yoki qaytarilishi masalasi alohida tushuntiriladi. Faol buyurtmaning mavjudligi so'rovni qabul qilmaslik uchun avtomatik asos emas."
    },
    {
      type: 'p',
      text: "9.4. Akkauntga bog'langan saqlash uchun asos qolmagan ma'lumotlar o'chiriladi. Buyurtma, to'lov yoki hisob hujjatlarini saqlash uchun mustaqil qonuniy asos mavjud bo'lsa, faqat zarur ma'lumotlar tegishli muddat davomida cheklangan tartibda saqlanadi. Bunday ma'lumotlar ro'yxati va muddatlari Maxfiylik siyosatida ochiq ko'rsatiladi."
    },
    {
      type: 'p',
      text: "9.5. Akkauntni o'chirish qarz, bajarilmagan buyurtma, qaytarish yoki kafolat bo'yicha qonuniy talablarni o'z-o'zidan bekor qilmaydi. Qayta ro'yxatdan o'tish avvalgi roziliklar, reklama obunalari yoki yopilgan akkaunt tarixini avtomatik tiklamaydi."
    },

    { type: 'h2', text: '10. Xavfsizlik va javobgarlik' },
    {
      type: 'p',
      text: "10.1. Foydalanuvchi to'g'ri ma'lumot taqdim etadi, begona akkauntga kirish, kodlarni ommaviy so'rash, firibgarlik yoki Platforma faoliyatini buzishga qaratilgan harakatlarni amalga oshirmaydi."
    },
    {
      type: 'p',
      text: "10.2. Xavfsizlikka tahdid bo'lsa, BUILDEX zarur va mutanosib cheklovlarni qo'llashi mumkin. Cheklash oldindan to'langan buyurtma, pulni qaytarish, shaxsga doir ma'lumotlar yoki boshqa qonuniy talablarga murojaat qilish yo'lini to'smaydi."
    },
    {
      type: 'p',
      text: "10.3. Tomonlar o'z majburiyatlarini bajarmaganligi uchun qonunchilikka muvofiq javob beradi. Ushbu oferta Sotuvchining barcha javobgarligini chiqarib tashlash yoki iste'molchining qonuniy huquqlarini cheklash sifatida qo'llanmaydi."
    },
    {
      type: 'p',
      text: "10.4. Yengib bo'lmaydigan kuch holati qonunda belgilangan mezonlar bilan baholanadi. Oddiy qoldiq xatosi, narxdagi texnik xato yoki pudratchining odatiy kechikishi avtomatik ravishda bunday holat hisoblanmaydi."
    },

    { type: 'h2', text: '11. Tahrirlar va nizolar' },
    {
      type: 'p',
      text: "11.1. Yangi tahrirning raqami va kuchga kirish sanasi e'lon qilinadi. Muhim o'zgarish foydalanuvchiga tushunarli tarzda bildiriladi. Yangi maqsadga oid rozilik zarur bo'lsa, u alohida olinadi."
    },
    {
      type: 'p',
      text: "11.2. Yangi tahrir ilgari tasdiqlangan buyurtma narxi yoki shartlarini Xaridorning roziligisiz orqaga qarab o'zgartirmaydi. Qabul qilingan eski tahrir va buyurtma nusxalari tegishli saqlash tartibi bo'yicha saqlanadi."
    },
    {
      type: 'p',
      text: "11.3. Murojaatlar avval qo'llab-quvvatlash xizmatiga yuborilishi mumkin. Bu iste'molchining vakolatli organga yoki sudga bevosita murojaat qilish huquqini cheklamaydi. Nizolar O'zbekiston Respublikasining qonunchiligiga muvofiq hal qilinadi."
    },
    {
      type: 'p',
      text: "11.4. Bir bandning haqiqiy emasligi qolgan qonuniy bandlarni avtomatik bekor qilmaydi. Majburiy qonun normasi bilan ziddiyat bo'lsa, qonun normasi qo'llanadi."
    },

    { type: 'h2', text: "12. Rekvizitlar va murojaat kanallari" },
    { type: 'p', text: "Sotuvchi va Platforma egasi: «ENERGOSNAB» MChJ." },
    { type: 'p', text: 'STIR: 308542198.' },
    {
      type: 'p',
      text: "Pochta manzili: Toshkent shahri, Chilonzor tumani, Arnasoy ko'chasi, 10a-uy, O'zbekiston Respublikasi. Pochta indeksi: 10000."
    },
    { type: 'p', text: 'Sayt: https://buildex.uz/.' },
    { type: 'p', text: "Qo'llab-quvvatlash telefoni: +998 77 240 09 09." },
    {
      type: 'p',
      text: "Elektron pochta: buildexuz@gmail.com (shaxsga doir ma'lumotlar bo'yicha: buildexuz@gmail.com)."
    },
    { type: 'p', text: 'Maxfiylik siyosati sahifasi: https://buildex.uz/privacy.' },
    {
      type: 'p',
      text: "Yetkazish, to'lov va qaytarish shartlari sahifalari: https://buildex.uz/delivery, https://buildex.uz/payment, https://buildex.uz/returns."
    },
    { type: 'p', text: "Akkauntni o'chirish so'rovi sahifasi: https://buildex.uz/account/delete." },
    { type: 'p', text: "Yuridik shaxslar uchun bank rekvizitlari:" },
    {
      type: 'kv',
      rows: [
        { key: 'Tashkilot', value: '"ENERGOSNAB" МЧЖ' },
        {
          key: 'Адрес',
          value: 'г.Ташкент,р.Чиланзарский, Kатта Чиланзар-1 МФЙ, ул.Арнасой, дом-10-A'
        },
        { key: 'ИНН', value: '308542198' },
        { key: 'р/с', value: '20208000705400780001' },
        { key: 'МФО', value: '01158' },
        { key: 'Bank', value: 'в АКБ "КапиталБанк" Ягона филиал г. Ташкент.' }
      ]
    },
    {
      type: 'p',
      text: "Litsenziya yoki ruxsat talab etiladigan faoliyat/tovar mavjud bo'lsa, tegishli ma'lumotlar rasmiy sahifada va xariddan oldin taqdim etiladi."
    }
  ]
};

export const ofertaPage: TrustPageSet = {
  uz,
  ru: {
    ...uz,
    title: 'Публичная оферта — Buildex',
    description:
      'Условия использования аккаунта и покупки товаров на сайте и в приложении Buildex: заказ, оплата, доставка, возврат.'
  }
};
