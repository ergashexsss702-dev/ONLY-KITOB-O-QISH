import { Book, Category } from '../types';

export const initialCategories: Category[] = [
  { id: 'all', nameUz: 'Barcha kitoblar', nameRu: 'Все книги', nameEn: 'All Books', icon: 'Library', displayOrder: 0 },
  { id: 'ozbek-adabiyoti', nameUz: 'O‘zbek adabiyoti', nameRu: 'Узбекская литература', nameEn: 'Uzbek Literature', icon: 'BookOpen', displayOrder: 1 },
  { id: 'jahon-adabiyoti', nameUz: 'Jahon adabiyoti', nameRu: 'Мировая литература', nameEn: 'World Literature', icon: 'Globe', displayOrder: 2 },
  { id: 'sheriyat', nameUz: 'She‘riyat', nameRu: 'Поэзия', nameEn: 'Poetry', icon: 'Feather', displayOrder: 3 },
  { id: 'sarguzasht', nameUz: 'Sarguzasht', nameRu: 'Приключения', nameEn: 'Adventure', icon: 'Compass', displayOrder: 4 },
  { id: 'fantastika', nameUz: 'Fantastika', nameRu: 'Фантастика', nameEn: 'Sci-Fi & Fantasy', icon: 'Rocket', displayOrder: 5 },
  { id: 'talimiy', nameUz: 'Ta‘limiy kitoblar', nameRu: 'Образовательные', nameEn: 'Educational', icon: 'GraduationCap', displayOrder: 6 },
  { id: 'bolalar', nameUz: 'Bolalar adabiyoti', nameRu: 'Детская литература', nameEn: 'Children Literature', icon: 'Smile', displayOrder: 7 },
  { id: 'bepul', nameUz: 'Bepul kitoblar', nameRu: 'Бесплатные книги', nameEn: 'Free Books', icon: 'Gift', displayOrder: 8 },
];

export const initialBooks: Book[] = [
  {
    id: 'otkan-kunlar',
    title: 'O‘tkan Kunlar',
    author: 'Abdulla Qodiriy',
    categoryId: 'ozbek-adabiyoti',
    genre: 'Tarixiy roman',
    coverUrl: '/src/assets/images/book_cover_otkan_kunlar_1792381373922.jpg',
    description: 'O‘zbek adabiyotining ilk romani. Otabek va Kumushbibining fojiali sevgisi, Turkiston xonliklari davridagi ijtimoiy-siyosiy ahvol, qadriyatlar va xalq turmush tarzi nihoyatda yuksak badiiy mahorat bilan tasvirlangan durdona asar.',
    language: 'uz',
    ageRating: '16+',
    price: 0,
    isFree: true,
    rating: 4.9,
    ratingCount: 382,
    pageCount: 18,
    fileType: 'reader',
    licenseInfo: 'Ochiq litsenziya / Jamoat mulki (O‘zbekiston klassik merosi)',
    publisher: 'Sharq nashriyoti',
    publishedYear: 1926,
    isActive: true,
    chapters: [
      { id: 'ch1', title: 'Muallifdan: So‘z boshi', startPage: 1 },
      { id: 'ch2', title: '1-bob: Marg‘ilon xonadonida', startPage: 3 },
      { id: 'ch3', title: '2-bob: Otabekning siri', startPage: 7 },
      { id: 'ch4', title: '3-bob: Toshkent va Marg‘ilon orasi', startPage: 12 },
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'So‘z boshi',
        content: `Modomiki, biz yangi davrga oyoq qo‘ydik, bas, biz har bir yo‘sunda ham shu yangi davrning yangiliklari orqasidan ergashishimiz va shunga o‘xshash dostonchilik, ro‘monchilik va hikoyachiliklarda ham yangi tushunchalar bilan qalam tebratishimiz lozimdir.\n\nUshbu taqdim qilinayotgan «O‘tkan kunlar» o‘zbek tarixiy romanchiligining birinchi tajribasidir. Mavzuni tariximizning eng kir, qora kunlaridan — xonliklar zamonidagi o‘zboshimchalik va qon to‘kishlar davridan oldim.\n\nMaqsadim — o‘tkan qora kunlarimizni yodga keltirib, bugungi yorug‘ kunlarning qadriga yetishimiz va tariximiz xatolaridan ibrat olishimizdir.`
      },
      {
        pageNumber: 2,
        chapterTitle: 'So‘z boshi',
        content: `Otabek kabi pok vijdonli, o‘qimishli yigitlarimiz xalqimizning eng buyuk fazilatlarini o‘zida mujassam etgan. Kumushbibi esa o‘zbek ayolining tengsiz vafosi, nozik iffati va cheksiz muhabbatining yorqin timsolidir.\n\nO‘quvchi bu sahifalarda nafaqat qalb musibatini, balki millatimiz fojiasini, parokandalik keltirgan alamli oqibatlarni ham ko‘radi.\n\nAbdulla Qodiriy (Julqunboy)\nToshkent, 1926-yil.`
      },
      {
        pageNumber: 3,
        chapterTitle: '1-bob: Marg‘ilon xonadonida',
        content: `1264-hijriy yil, qovun pishiq mahali. Marg‘ilonning mashhur savdogari Mirzakarim qutidor xonadonida odatdagidan boshqacha sokinlik va hayajon hukm surardi.\n\nToshkentdan kelgan yosh mehmon — Otabek o‘zining olijanob yurish-turishi, chuqur mulohazalari va odobi bilan barchaning mehrini qozongan edi.\n\n— Otabek o‘g‘limiz juda mulohazali, o‘qimishli yigit ko‘rinadi, — dedi Qutidor xotiniga sekin shivirlab. — Har bir so‘zida hikmat, har bir harakatida andisha bor.`
      },
      {
        pageNumber: 4,
        chapterTitle: '1-bob: Marg‘ilon xonadonida',
        content: `Hovli chetidagi salqin ayvonda choy ichilar ekan, qutidor Otabekdan Toshkentdagi yangiliklar, xonlikdagi soliqlar va xalqning kayfiyati haqida so‘radi.\n\n— Toshkent tinch, ammo beklar o‘rtasidagi nizo xalqni holdan toydirmoqda, amakijon, — dedi Otabek chuqur xo‘rsinib. — Birlashmagan xalq hech qachon saodat topolmaydi. Savdogar tinchlikni, dehqon esa omonlikni istaydi.`
      },
      {
        pageNumber: 5,
        chapterTitle: '1-bob: Marg‘ilon xonadonida',
        content: `Shu payt ichkaridan ohista qadam tovushi eshitildi. Hovli o‘rtasidagi anorlar panasidan bir nozanin ko‘rindi — bu Kumushbibi edi. Qoshlari kamondek, ko‘zlari tim qora, yurishi xuddi oqqushning suvda suzishiday mayin.\n\nOtabek nigohi tasodifan unga tushdi-yu, yuragi qinidan chiqqudek ura boshladi. Dunyoda bu qadar go‘zallik, bu qadar poklik bo‘lishi mumkinligini u tasavvur ham qilmagan edi.`
      },
      {
        pageNumber: 6,
        chapterTitle: '1-bob: Marg‘ilon xonadonida',
        content: `Kumushbibi ham begona nigohni sezib, yuziga qizillik yugurdi va shosha-pisha o‘z xonasiga kirdi. Ammo shu bir lahzalik nigoh ikki yosh yuragida hech qachon so‘nmaydigan muhabbat olovini yoqqan edi.\n\nKechasi Otabek mehmonxonada uxlolmay to‘lg‘ondi. Marg‘ilon osmonidagi porloq yulduzlar unga Kumushning ko‘zlarini eslatardi.`
      },
      {
        pageNumber: 7,
        chapterTitle: '2-bob: Otabekning siri',
        content: `Ertasi kuni Otabek do‘sti Hasanali bilan Marg‘ilon bozorini aylandi. Hasanali uning parishonxotirligini sezib kulimsiradi:\n\n— Bekvachcham, kechadan beri xayolingiz qayerda? Go‘yo bu yerda emassiz, ko‘nglingiz kimga bog‘landi?\n\nOtabek do‘stiga sirlarini ochdi: — Hasanali aka, men umrimda birinchi marta hayotning haqiqiy ma'nosini angladim. Agar taqdirim shu qiz bilan bog‘lanmasa, menga bu dunyoning hech qanday boyligi kerak emas.`
      },
      {
        pageNumber: 8,
        chapterTitle: '2-bob: Otabekning siri',
        content: `Mirzakarim qutidor Otabekning nasl-nasabini, otasi Yusufbek hojining obro‘-e'tiborini yaxshi bilardi. Shuning uchun ham sovchilik xabari kelganida quvonchini yashirolmadi.\n\nAmmo Kumushning onasi Oftob oyim dastlab ikkilanar, yagona qizini uzoq Toshkentga uzatishdan xavotirda edi.\n\n— Qizimiz guldek, Toshkent olis, biror kor-hol bo‘lsa holidan kim xabar oladi? — derdi u ko‘z yoshlarini artib.`
      },
      {
        pageNumber: 9,
        chapterTitle: '2-bob: Otabekning siri',
        content: `Oxir-oqibat, oqsoqollar va qarindoshlar maslahati bilan to‘yga rozilik berildi. Marg‘ilonda quvonchli kunlar boshlandi. Otabek va Kumushbibi nikoh oqshomida bir-birlariga cheksiz sadoqat va vafo qasamyodini qildilar.\n\n— Otabek aka, siz men uchun butun jahonsiz, — derdi Kumush ko‘zlarida baxt yulduzlari porlab.`
      },
      {
        pageNumber: 10,
        chapterTitle: '2-bob: Otabekning siri',
        content: `Ammo baxtiyor kunlar uzoqqa cho‘zilmadi. Toshkentdan xavotirli maktub keldi: Otabekning otasi Yusufbek hoji o‘g‘lini zudlik bilan qaytishini talab qilardi. Toshkentda Musulmonqul va qipchoqlar o‘rtasida nizo kuchaygan, har bir kishi shubha ostida edi.\n\nOtabek sevgilisini Marg‘ilonda qoldirib, og‘ir yurak bilan yo‘lga otlandi.`
      },
      {
        pageNumber: 11,
        chapterTitle: '2-bob: Otabekning siri',
        content: `Kumushbibi otining ortidan uzoq tikilib qoldi. Har bir bosilgan qadam uning yuragidan bir parchani yulib olayotgandek tuyulardi.\n\n— Tez qayting, bek akam, sizsiz menga Marg‘ilon tor bo‘ladi, — deb pichirladi u daryo bo‘yida.`
      },
      {
        pageNumber: 12,
        chapterTitle: '3-bob: Toshkent va Marg‘ilon orasi',
        content: `Toshkentda esa Yusufbek hoji oilaviy manfaatlar va do‘stona rishtalarni mustahkamlash maqsadida Otabekni Ziyo shohichi qizi Zaynabga uylantirish taraddudiga tushgan edi.\n\nOtabek ota-onasining bu niyatini eshitib, larzaga tushdi: — Otajon, onajon! Men Marg‘ilonda uylandim, mening Kumushdek halol juftim bor! Men boshqa birovga uylanolmayman!`
      },
      {
        pageNumber: 13,
        chapterTitle: '3-bob: Toshkent va Marg‘ilon orasi',
        content: `Onasi O‘zbek oyim qaysarlik qilib turib oldi: — Toshkentlik qizdan qo‘ymasin! Marg‘ilonlik xotining bo‘lsa bor bo‘lsin, lekin bizga ham o‘zimizdan kelin kerak!\n\nO‘sha zamon odobiga ko‘ra ota-onaga qattiq qarshi chiqish gunoh hisoblanardi. Otabek qalbida mislsiz kurash, fojea boshlandi.`
      },
      {
        pageNumber: 14,
        chapterTitle: '3-bob: Toshkent va Marg‘ilon orasi',
        content: `Majburiy ikkinchi nikoh Otabekning ham, Zaynabning ham, eng asosiysi begunoh Kumushbibining ham hayotini fojiaga aylantirdi.\n\nZaynab kundoshlik rashki olovida yona boshladi. U Otabekning butun qalbi faqat Kumushga tegishli ekanini bilar va bundan azob chekardi.`
      },
      {
        pageNumber: 15,
        chapterTitle: '3-bob: Toshkent va Marg‘ilon orasi',
        content: `Kumushbibi Toshkentga keltirilgach, hovlida sovuq sukunat o‘rnatildi. Ikki ayol bir tom ostida — biri sof muhabbat egasi, ikkinchisi qora rashk asirasi.\n\nOtabek esa yurt tashvishi, otasi boshiga tushgan xavf-xatarlar va oilaviy alamlar girdobida qolgan edi.`
      },
      {
        pageNumber: 16,
        chapterTitle: '3-bob: Toshkent va Marg‘ilon orasi',
        content: `Kumushbibi Toshkentdagi qaynona zulmiga ham, muhitning begonaligiga ham sabr qildi. U faqat Otabekning ko‘zlaridagi mehr bilan yashardi.\n\nBiroq qora niyatli kimsalar va ko‘r rashk nihoyat o‘zining mudhish ishini qildi...`
      },
      {
        pageNumber: 17,
        chapterTitle: 'Xotima',
        content: `Kumush zaharlangach, Otabekning dunyosi qorong‘i bo‘ldi. Begunoh Kumush jon taslim qilayotib ham faqat Otabekning baxtini tiladi:\n\n— Bek aka... yig‘lamang... O‘g‘limiz Habibulloni asrang... men sizdan roziman...\n\nBu so‘zlar butun Turkiston osmonida yangragan eng fojiali muhabbat nidosi edi.`
      },
      {
        pageNumber: 18,
        chapterTitle: 'Xotima',
        content: `Otabek barcha dunyoviy orzulardan kechdi. U vatan ozodligi va el himoyasi uchun jangga otlandi va mardlarcha halok bo‘ldi.\n\n«O‘tkan kunlar» — bu faqat sevgi qissasi emas, balki birlashmagan, xudbinlik va parokandalikka berilgan millatning o‘z o‘tmishidan chiqarishi kerak bo‘lgan eng buyuk sabog‘idir.`
      }
    ]
  },
  {
    id: 'xamsa-navoiy',
    title: 'Xamsa (Besh doston)',
    author: 'Alisher Navoiy',
    categoryId: 'ozbek-adabiyoti',
    genre: 'Mumtoz doston',
    coverUrl: '/src/assets/images/book_cover_hamsa_navoiy_1792381375049.jpg',
    description: 'Turkiy tilda yaratilgan ilk buyuk «Xamsa». «Hayrat ul-abror», «Farhod va Shirin», «Layli va Majnun», «Sab‘ai sayyor», «Saddi Iskandariy». Insoniylik, odob, adolat va ilohiy muhabbat madhi.',
    language: 'uz',
    ageRating: '12+',
    price: 0,
    isFree: true,
    rating: 5.0,
    ratingCount: 520,
    pageCount: 16,
    fileType: 'reader',
    licenseInfo: 'Ochiq litsenziya / Jahon merosi (UNESCO)',
    publisher: 'G‘afur G‘ulom nashriyoti',
    publishedYear: 1485,
    isActive: true,
    chapters: [
      { id: 'h1', title: 'Hayrat ul-abror (Yaxshilar hayrati)', startPage: 1 },
      { id: 'h2', title: 'Farhod va Shirin dostonidan lavhalar', startPage: 5 },
      { id: 'h3', title: 'Layli va Majnun dostonidan', startPage: 10 },
      { id: 'h4', title: 'Hikmatlar va pand-nasihatlar', startPage: 14 }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Hayrat ul-abror',
        content: `Bismillohir-Rahmonir-Rahim.\n\nEy falak charxini aylanuvchi etgan Qodir, borliqni yo‘qdan bor qilgan Parvardigor!\n\nOdamzod barcha maxluqotlar ichra eng sharaflisi bo‘lib yaratildi. Unga aql toji, nutq ne'mati va muhabbat javhari ato etildi.\n\nKishi bo‘lsa odamiylik bilan kishi,\nOdamiylik — elga naf yetkurmak ishi!\n\nKimki bir kishiga yaxshilik qilsa, u barcha insoniyatga yaxshilik qilgan kabidir. Yomonlik qiluvchi esa o‘z qabriga o‘zi o‘t yoqqan bechoradir.`
      },
      {
        pageNumber: 2,
        chapterTitle: 'Hayrat ul-abror',
        content: `Navoiy qalamidan to‘kilgan ushbu satrlar asrlar osha insoniyat qalbini yoritib kelmoqda:\n\nNaf'ing agar xalqqa beshakdurur,\nBilki, bu naf' o‘zingga ko‘prakdurur.\n\nOz yeb, oz uxlab, oz so‘zla mudom,\nToki topgaysan salomatlik tamom.\n\nTilga e'tibor — elga e'tibordir. So‘z gavhardir, uni behuda sochish nodonlik alomatidir.`
      },
      {
        pageNumber: 3,
        chapterTitle: 'Hayrat ul-abror',
        content: `Shoh bo‘lsang ham adolatni unutma. Chunki adolatsiz shohlik — zolimlikning boshqa bir nomidir.\n\nZulm qilgan kishi uzoq yashamas, uning toju-taxti shamol uchirgan xasdek yo‘q bo‘lur. Ammo adolatli hukmdorning nomi xalq xotirasida mangu quyoshdek porlaydi.\n\nIlm o‘rgan, yoshlik g‘animatdir. Ilmsiz inson mevasiz daraxtga o‘xshaydi.`
      },
      {
        pageNumber: 4,
        chapterTitle: 'Hayrat ul-abror',
        content: `Do‘st tanlashda hushyor bo‘l. Soxta do‘st quyoshli kunda soyangdek ergashtirib yuradi, ammo boshing uzra qora bulut kelganda birinchi bo‘lib seni tashlab qochadi.\n\nHaqiqiy do‘st esa boshingda balo paytida qalqon bo‘lur.`
      },
      {
        pageNumber: 5,
        chapterTitle: 'Farhod va Shirin',
        content: `Farhod — komil inson, fidokor qahramon timsoli. U Chin xoqonining yolg‘iz o‘g‘li bo‘la turib, shohlik kibridan kechdi va mehnat, san'at va ilm yo‘lini tanladi.\n\nQo‘liga tesha olib, tog‘larni talqon qildi. U Shirin visoliga yetish uchun emas, balki xalqqa obi hayot — chashma olib kelish uchun toshlar bilan kurashdi.`
      },
      {
        pageNumber: 6,
        chapterTitle: 'Farhod va Shirin',
        content: `Tog‘ qazuvchi Farhodning har bir zarbasida millat qudrati, inson irodasi namoyon bo‘ldi:\n\nHar teshakim urar ul mardona,\nToshlar bo‘lur erdi dona-dona!\n\nXisrav esa saltanat egasi bo‘la turib, xudbinlik va qora niyatlar domida qoldi. Mehnat va pok sevgining kuchi qudratli armiyalar va oltin xazinalardan ustun keldi.`
      },
      {
        pageNumber: 7,
        chapterTitle: 'Farhod va Shirin',
        content: `Shirin ham Farhodning sadoqatiga munosib go‘zal va oqila qiz edi. U saltanat va boylikka aldanmadi. Pok qalb faqat pok muhabbatni tanlaydi.\n\nNavoiy bu doston orqali inson mehnati, uning pokiza ruhiyati har qanday xonlik va taxtdan ulug‘vor ekanini butun dunyoga ko‘rsatdi.`
      },
      {
        pageNumber: 8,
        chapterTitle: 'Farhod va Shirin',
        content: `Besh asr o‘tdi, ammo Farhodning sadoqati va mehnati timsol bo‘lib qoldi. O‘zbek xalqi Farhod siymosida o‘zining mehnatsevar, or-nomusli va matonatli o‘g‘lonlarini ko‘radi.`
      },
      {
        pageNumber: 9,
        chapterTitle: 'Farhod va Shirin',
        content: `Agar oshiq bo‘lsang, Farhoddek bo‘lgin,\nEl dardi birlan yona-yon o‘lgin!\n\nShoirning bu o‘giti bugungi kun yoshlari uchun ham buyuk yo‘lchi yulduzdir.`
      },
      {
        pageNumber: 10,
        chapterTitle: 'Layli va Majnun',
        content: `Majnun — Qaysning ilohiy ishq yo‘lidagi sarsonligi. Bu shunchaki bir qizga bo‘lgan havas emas, balki butun borliqda Haq jamolini ko‘rish qudratidir.\n\nLayli husni — Haq nurining ko‘zgusi. Majnun sahrolarda kiyiklar, qushlar bilan do‘st tutindi, chunki ularda insonlarga xos xiyonat va riyo yo‘q edi.`
      },
      {
        pageNumber: 11,
        chapterTitle: 'Layli va Majnun',
        content: `Dunyoni tark etgan oshiqning yuragi shunday deydi:\n\nIshq aro har kimki qadam qo‘ymadi,\nOdam emas ul, tiriklik tuymadi!\n\nMuhabbatsiz ko‘ngil — kimsasiz xarobadir. Unda na gul unadi, na bulbul sayraydi.`
      },
      {
        pageNumber: 12,
        chapterTitle: 'Layli va Majnun',
        content: `Navoiy bu dostonida turkiy tilning cheksiz boyligini namoyish etdi. Birgina so‘z bilan inson qalbining ming bir qirrasini tasvirlab berdi.`
      },
      {
        pageNumber: 13,
        chapterTitle: 'Layli va Majnun',
        content: `Layli va Majnun sevgisi jismoniy dunyodan ustun bo‘lib, abadiyat sarhadiga tutashdi.`
      },
      {
        pageNumber: 14,
        chapterTitle: 'Hikmatlar',
        content: `Odamiy ersang, demagil odami,\nOnikim, yo‘q xalq g‘amidin g‘ami!\n\nBu bayt dunyoning barcha tillariga tarjima qilingan va BMT minbarlaridan yangragan buyuk gumanistik g‘oyadir.`
      },
      {
        pageNumber: 15,
        chapterTitle: 'Hikmatlar',
        content: `Bilmaganni so‘rab o‘rgangan olim,\nOrlanib so‘ramagan o‘ziga zolim!\n\nIlm o‘rganishdan uyalgan odam umrbo‘yi jaholat botqog‘ida qoladi. Donolarning suhbatida bo‘lish oltin topishdan afzaldir.`
      },
      {
        pageNumber: 16,
        chapterTitle: 'Hikmatlar',
        content: `So‘zingga bo‘lgin ehtiyot,\nBalki unda yashiringandir hayot.\n\nAlisher Navoiyning o‘lmas merosi o‘zbek xalqining ma'naviy xazinasi bo‘lib, kelajak avlodlarni mudom kamolot sari chorlayveradi.`
      }
    ]
  },
  {
    id: 'boburnoma',
    title: 'Boburnoma',
    author: 'Zahiriddin Muhammad Bobur',
    categoryId: 'ozbek-adabiyoti',
    genre: 'Tarixiy memuar',
    coverUrl: '/src/assets/images/book_cover_boburnoma_1792381373966.jpg',
    description: 'Buyuk sarkarda, shoir va davlat arbobi Bobur Mirzoning o‘z hayoti, Andijon, Samarqand, Kobul va Hindistondagi yurishlari, tabiat hodisalari va insoniy kechinmalari bayon etilgan jahonshumul asari.',
    language: 'uz',
    ageRating: '12+',
    price: 0,
    isFree: true,
    rating: 4.8,
    ratingCount: 295,
    pageCount: 14,
    fileType: 'reader',
    licenseInfo: 'Ochiq litsenziya / Jamoat mulki',
    publisher: 'Fan nashriyoti',
    publishedYear: 1530,
    isActive: true,
    chapters: [
      { id: 'b1', title: "Farg‘ona viloyati va Andijon ta'rifi", startPage: 1 },
      { id: 'b2', title: 'Samarqand taxti uchun kurash', startPage: 5 },
      { id: 'b3', title: 'Kobul va Hindiston xotiralari', startPage: 9 },
      { id: 'b4', title: 'Bobur ruboiylari va vasiyatlari', startPage: 12 }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Farg‘ona viloyati',
        content: `Sakkiz yuz to‘qson to‘qqizinchi yili ramazon oyida o‘n ikki yoshimda Farg‘ona viloyatida podshoh bo‘ldim.\n\nFarg‘ona viloyati beshinchi iqlimdandir. Sharqida Qashqar, g‘arbida Samarqand, janubida Badaxshon tog‘laridir. Kichikroq viloyatdur, oshliq va mevasi ko‘p.\n\nAndijon uning poytaxtidir. Havosi toza, oqar suvlari bisyor. Qovuni va uzumi g‘oyat shirin bo‘lur. Qirg‘ovuli ko‘p bo‘lurkim, to‘rt kishi yesa bir qirg‘ovul go‘shtiga qanoat qilur.`
      },
      {
        pageNumber: 2,
        chapterTitle: 'Farg‘ona viloyati',
        content: `Andijon ahli turkdurlar. Shahar va bozorida turkiy bilmagan kishi yo‘qdur. Elining lafzi qalam bila to‘g‘ridur. Alisher Navoiyning musannafoti garchi Hirotda bo‘lsa ham, bu til bila bitilgandur.\n\nOshxonalarida non va taomlar g‘oyat tansiq pishirilur. Shahar qo‘rg‘oni to‘qqiz darvozalikdur. Ichki qal'asi mustahkam bo‘lib, atrofida chuqur xandaklar qazilgandur.`
      },
      {
        pageNumber: 3,
        chapterTitle: 'Farg‘ona viloyati',
        content: `Otam Umar Shayx Mirzo jasur, mard va saxiy kishi edi. Kamon otishda tengi yo‘q edi. Ko‘p vaqtini mutolaa bilan o‘tkazardi, «Shohnoma» va «Xamsa»ni sevib o‘qir edi.\n\nU to‘satdan Axsikent qo‘rg‘onida kaptarxona qulashi oqibatida vafot etdi va o‘n ikki yoshli boshimga saltanat yuki tushdi.`
      },
      {
        pageNumber: 4,
        chapterTitle: 'Farg‘ona viloyati',
        content: `Yoshligimga qaramay, amakilarim va tog‘alarim Farg‘onaga har tarafdan bostirib kela boshladilar. Ammo Andijon beklarining sadoqati va xalqning madadkorligi sababli yurtimizni saqlab qoldik.`
      },
      {
        pageNumber: 5,
        chapterTitle: 'Samarqand taxti',
        content: `Samarqand dunyoning eng go‘zal shaharlaridan biridur. Uni bobom Amir Temur poytaxt qilgan edi. Registon maydoni, Go‘ri Amir maqbarasi va Bibixonim masjidi g‘oyatda haybatlikdur.\n\nSamarqandni olmoq va unda adolatli davlat tuzmoq mening eng katta orzuim edi. Ikki bor Samarqandni oldim, ammo fitnalar va qiyinchiliklar tufayli unda uzoq tura olmadim.`
      },
      {
        pageNumber: 6,
        chapterTitle: 'Samarqand taxti',
        content: `Qahraton qish kunlarida askarlarim bilan muzli dovonlardan piyoda o‘tdik. Qor ko‘chkilarida o‘zim qor qazib, askarlarimga yo‘l ochdim. Sarkarda o‘z askaridan oldinda yurishi va qiyinchilikni teng ko‘rishi shartdur.`
      },
      {
        pageNumber: 7,
        chapterTitle: 'Samarqand taxti',
        content: `Tole' yo‘qi jonimga balolig‘ bo‘ldi,\nHar ishniki ayladim, xatolig‘ bo‘ldi.\nO‘z yerni qo‘yib, Hind sori yuzlandim,\nYorab, netayin, ne yuz qarolig‘ bo‘ldi!`
      },
      {
        pageNumber: 8,
        chapterTitle: 'Samarqand taxti',
        content: `Vatan ayrilig‘i inson yuragidagi eng bitmas yaradir. Oltin toju-taxtlar ham kishiga o‘z ona tuprog‘ining bir hovuch tuprog‘i o‘rnini bosolmaydi.`
      },
      {
        pageNumber: 9,
        chapterTitle: 'Kobul va Hindiston',
        content: `Kobulda bog‘lar barpo qildirdim. O‘sha yerda Andijon qovunini ko‘rib, ko‘zimga yosh keldi. Vatan yodi bir lahza ham ko‘nglimni tark etmadi.\n\nHindistonda buyuk Boburiylar saltanatini barpo etdim. Ko‘plab yo‘llar, karvonsaroylar, chorbog‘lar qurdirdim. Ammo har bir muvaffaqiyatim zamirida Andijon va Samarqand sog‘inchi yashardi.`
      },
      {
        pageNumber: 10,
        chapterTitle: 'Kobul va Hindiston',
        content: `Hindiston tabiati boshqacha: hayvonlari g‘aroyib, fillari qudratli, mevalari o‘zgacha. Ammo qovunlari Farg‘ona qovunlariga yetolmas.`
      },
      {
        pageNumber: 11,
        chapterTitle: 'Kobul va Hindiston',
        content: `O‘g‘lim Humoyun og‘ir kasal bo‘lganida, jonimni uning hayoti uchun fido qilishga tayyor ekanimni Tangriga nido qildim. Farzand dardi ota uchun barcha boyliklardan og‘irdir.`
      },
      {
        pageNumber: 12,
        chapterTitle: 'Ruboiylar',
        content: `Har kimki vafo qilsa, vafo topqusidur,\nHar kimki jafo qilsa, jafo topqusidur.\nYaxshi kishi ko‘rmagay yomonlik hargiz,\nHar kimki yomon bo‘lsa, jazo topqusidur!`
      },
      {
        pageNumber: 13,
        chapterTitle: 'Ruboiylar',
        content: `Yod etmas emish kishini g‘urbatda kishi,\nShod etmas emish ko‘ngulni mehnatda kishi.\nKo‘nglumni bu g‘urbatda sevar yor topilmas,\nBir do‘st topilmas dardi bedavomga darmon!`
      },
      {
        pageNumber: 14,
        chapterTitle: 'Vasiyat',
        content: `Farzandlarimga vasiyatim shuki: hamisha adolat bilan ish yuriting. Xalqqa mehr bering, olimlar va hunarmandlarni qadrlang. Dunyo besh kunlikdir, yaxshi nom qoldirishdan ulug‘ saodat yo‘qdur.`
      }
    ]
  },
  {
    id: 'kichkina-shahzoda',
    title: 'Kichkina Shahzoda',
    author: 'Antuan de Sent-Ekzyuperi',
    categoryId: 'jahon-adabiyoti',
    genre: 'Falsafiy ertak',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    description: 'Dunyodagi eng ko‘p o‘qilgan va eng samimiy asarlardan biri. B612 asteroididan kelgan jajji shahzoda, uning sevimli atirguli, tulki bilan do‘stligi va insoniyat qadriyatlari haqida ajoyib falsafiy ertak.',
    language: 'uz',
    ageRating: 'Barchaga',
    price: 0,
    isFree: true,
    rating: 4.9,
    ratingCount: 640,
    pageCount: 12,
    fileType: 'reader',
    licenseInfo: 'Ochiq litsenziya / Jamoat mulki',
    publisher: 'Yoshlar nashriyot uyi',
    publishedYear: 1943,
    isActive: true,
    chapters: [
      { id: 'ks1', title: '1-bob: Sahrodagi uchrashuv', startPage: 1 },
      { id: 'ks2', title: '2-bob: Atirgul siri', startPage: 4 },
      { id: 'ks3', title: '3-bob: Tulki bilan suhbat', startPage: 8 },
      { id: 'ks4', title: '4-bob: Eng muhim haqiqat', startPage: 11 }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '1-bob: Sahrodagi uchrashuv',
        content: `Olti yoshimda bir kitobda dahshatli bir rasm ko‘rgan edim: bahaybat bo‘g‘ma ilon bir yovvoyi hayvonni butunicha yutayotgan edi.\n\nMen ham rangli qalam olib, ilk rasmimni chizdim. Katta yoshdagilarga ko‘rsatib: «Qo‘rqinchli emasmi?» deb so‘radim.\n\nUlar: «Shlyapadan nimaga qo‘rqish kerak?» deyishdi. Holbuki u shlyapa emas, ichida filni hazm qilayotgan ulkan bo‘g‘ma ilon edi.\n\nKattalar hamma narsani tushuntirib berishni talab qiladilar, ularning o‘zlari hech narsani mustaqil tushunolmaydilar.`
      },
      {
        pageNumber: 2,
        chapterTitle: '1-bob: Sahrodagi uchrashuv',
        content: `Shunday qilib, men rassomlikni tashlab uchuvchi bo‘ldim. Bir kuni samolyotim Saxroi Kabir sahrosiga qulab tushdi. Atrofimda yuzlab chaqirimlik huvillagan qum sahrosi bor edi.\n\nTongda mayin, jajji bir ovoz meni uyg‘otdi:\n— Iltimos... menga qo‘zichoq chizib bering!`
      },
      {
        pageNumber: 3,
        chapterTitle: '1-bob: Sahrodagi uchrashuv',
        content: `Men ko‘zlarimni ishqalab qaradim: qarshimda oltin sochli, o‘zgacha libosdagi jajji bir bola turardi. U na suvsiz ko‘rinar, na sahrodan qo‘rqardi.\n\nMen unga bir quti chizib berdim va dedim: «Qo‘zichoq mana shu qutining ichida!»\n\nBola quvonib ketdi: «Aynan menga keragi shu edi! U juda kichkina ekanmi?» Shunday qilib men Kichkina Shahzoda bilan tanishdim.`
      },
      {
        pageNumber: 4,
        chapterTitle: '2-bob: Atirgul siri',
        content: `U B612 deb ataluvchi kichik bir asteroiddan kelgan edi. Bu sayyora shunchalik kichkina ediki, u stulini bir oz siljitib, kuniga qirq to‘rt marta quyosh botishini tomosha qilishi mumkin edi.\n\nUning sayyorasida uchta mitti vulqon va bitta nozik atirgul bor edi.`
      },
      {
        pageNumber: 5,
        chapterTitle: '2-bob: Atirgul siri',
        content: `Atirgul juda erka va injiq edi. U to‘rtta tikani bilan qurollangan, shamoldan va qoralamalardan qo‘rqardi:\n\n— Kechasi ustimga shisha qalpoq yopib qo‘ying, bu yer juda sovuq, — derdi u shahzodaga.\n\nShahzoda unga sidqidildan g‘amxo‘rlik qilar, ammo gulning injiqliklaridan charchab, o‘z sayyorasini tark etishga qaror qildi.`
      },
      {
        pageNumber: 6,
        chapterTitle: '2-bob: Atirgul siri',
        content: `Ketish oldidan gul ko‘z yoshi qildi: «Men nodonlik qildim. Kechir meni. Men seni sevardim, faqat buni aytishga andisha qildim. Baxtli bo‘l...»\n\nShahzoda o‘shanda tushunmadi: gulning so‘zlariga emas, qilgan ishlariga, uning xushbo‘y iforiga qarab baho berish kerak edi.`
      },
      {
        pageNumber: 7,
        chapterTitle: '2-bob: Atirgul siri',
        content: `U koinot bo‘ylab sayohat qilib, shohlarni, xudbinlarni, ichkilikbozlarni, biznesmenlarni ko‘rdi. Ularning bari o‘zlaricha muhim ishlarni qilayotgandek tuyulardi, ammo aslida eng muhim narsani unutgan edilar.`
      },
      {
        pageNumber: 8,
        chapterTitle: '3-bob: Tulki bilan suhbat',
        content: `Yer yuzida Kichkina Shahzoda bir bog‘da besh mingta bir xil atirgulni ko‘rib yig‘lab yubordi:\n\n— Mening gulim o‘zini koinotda yagona deb bilardi. Vaholanki u oddiygina gul ekan-ku!\n\nShu payt olma daraxti ostidan bir tulki ko‘rindi.`
      },
      {
        pageNumber: 9,
        chapterTitle: '3-bob: Tulki bilan suhbat',
        content: `— Kel, men bilan o‘yna, — dedi Shahzoda.\n— Men sen bilan o‘ynolmayman, — dedi tulki. — Chunki men hali qo‘lga o‘rgatilmaganman.\n\n— «Qo‘lga o‘rgatish» nima degani?\n— Bu «rishta bog‘lash» degani, — tushuntirdi tulki. — Hozircha sen men uchun oddiy bolakaysan, men esa o‘n minglab tulkilarning biriman. Ammo sen meni qo‘lga o‘rgatsang, biz bir-birimizga kerak bo‘lamiz. Sen men uchun dunyoda yagona bo‘lasan!`
      },
      {
        pageNumber: 10,
        chapterTitle: '3-bob: Tulki bilan suhbat',
        content: `Shahzoda o‘z gulini esladi: «Meni bir gul qo‘lga o‘rgatgan bo‘lsa kerak...»\n\nTulki unga do‘stlik sabog‘ini o‘rgatdi: har kuni ayni bir vaqtda kelish kerak, shunda qalb bayramni kuta boshlaydi.`
      },
      {
        pageNumber: 11,
        chapterTitle: '4-bob: Eng muhim haqiqat',
        content: `Xayrlashuv chog‘ida tulki unga eng buyuk sirni aytdi:\n\n— Mana mening sirim, u juda oddiy: FAQAT QALB KO‘ZI BILANGINA TO‘G‘RI KO‘RISH MUMKIN. ENG ASOSIY NARSA KO‘ZGA KO‘RINMAYDI!\n\n— Eng asosiy narsa ko‘zga ko‘rinmaydi, — deb takrorladi Shahzoda, unutmaslik uchun.`
      },
      {
        pageNumber: 12,
        chapterTitle: '4-bob: Eng muhim haqiqat',
        content: `— Sening gulingni shunchalik qadrli qilgan narsa — unga sarflagan vaqtingdir.\n\n— Odamlar bu haqiqatni unutib qo‘ydilar, ammo sen unutma: SEN O‘ZING QO‘LGA O‘RGATGAN HAR BIR JON UCHUN HAMISHA MAS'ULSAN. Sen o‘z atirguling uchun mas'ulsan!\n\nKichkina Shahzoda yulduzlar sari boqib, o‘z gulining oldiga qaytishga oshiqdi.`
      }
    ]
  },
  {
    id: 'on-besh-yoshli-kapitan',
    title: 'O‘n besh yoshli kapitan',
    author: 'Jyul Vern',
    categoryId: 'sarguzasht',
    genre: 'Sarguzasht romani',
    coverUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd9?auto=format&fit=crop&w=600&q=80',
    description: "Yosh Dik Sendning «Piligrim» kemasidagi matonati, qaroqchilar va qul savdogarlariga qarshi jasoratli kurashi, okeanlar va Afrika qit'asidagi xavfli sarguzashtlari bayon etilgan jahon klassikasi.",
    language: 'uz',
    ageRating: '12+',
    price: 0,
    isFree: true,
    rating: 4.8,
    ratingCount: 310,
    pageCount: 15,
    fileType: 'reader',
    licenseInfo: 'Ochiq litsenziya / Jamoat mulki',
    publisher: 'O‘qituvchi nashriyoti',
    publishedYear: 1878,
    isActive: true,
    chapters: [
      { id: 'j1', title: '1-bob: «Piligrim» kemasi', startPage: 1 },
      { id: 'j2', title: '2-bob: Kapitan halokati va Dik Send', startPage: 5 },
      { id: 'j3', title: '3-bob: Kompasning buzilishi', startPage: 9 },
      { id: 'j4', title: "4-bob: Noma'lum qirg‘oqlar", startPage: 13 }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '1-bob: «Piligrim» kemasi',
        content: `1873-yil 2-fevral kuni «Piligrim» kema-shxunasi Tinch okeanining janubiy qismida suzib borardi. Kapitan Xall boshchiligidagi kema kiti ovlash mavsumini tugatib, San-Fransisko tomon yo‘l olgan edi.\n\nKemada kapitan bilan birga kema egasi janob Ueldonning rafiqasi missis Ueldon, uning besh yoshli o‘g‘li Jek va keksa qarindoshi Benedikt bor edi.`
      },
      {
        pageNumber: 2,
        chapterTitle: '1-bob: «Piligrim» kemasi',
        content: `Kemadagi eng yosh dengizchi — o‘n besh yashar Dik Send edi. U yetim bolakay bo‘lib, janob Ueldon uni o‘z tarbiyasiga olgan va dengizchilik maktabida o‘qitgan edi.\n\nDik Send o‘z yoshiga nisbatan juda baquvvat, ziyrak, andishali va qat'iyatli yigit edi. U dengizni sevar va yaxshi kapitan bo‘lishga intilardi.`
      },
      {
        pageNumber: 3,
        chapterTitle: '1-bob: «Piligrim» kemasi',
        content: `Kemada kutilmagan bir kishi — kema oshpazi Negoro bor edi. U kamgap, qovog‘idan qor yoqqan, dengizchilar bilan do‘stlashmaydigan shubhali kimsa edi. Hech kim uning o‘tmishini bilmasdi.`
      },
      {
        pageNumber: 4,
        chapterTitle: '1-bob: «Piligrim» kemasi',
        content: `Bir kuni dengizchilar yarim cho‘kkan kemaga duch kelishdi. Unda bir necha qora tanli odamlar va Dingo laqabli ulkan it omon qolgan edi. Dingo Negoroni ko‘rishi bilanoq dahshatli tarzda irillay boshladi.`
      },
      {
        pageNumber: 5,
        chapterTitle: '2-bob: Kapitan halokati',
        content: `Kutilmaganda ulkan bahaybat kit ko‘rindi. Tajribali kapitan Xall barcha dengizchilarni olib, qayiqda kit oviga otlandi. Ammo jarohatlangan ulkan jonivor dumining kuchli zarbasi bilan qayiqni parchalamoq qildi.\n\nBarcha tajribali dengizchilar va kapitan Xall okean tubiga g‘arq bo‘ldi. Kema bortida faqat missis Ueldon, kichkina Jek, xizmatkorlar va o‘n besh yoshli Dik Send qoldi!`
      },
      {
        pageNumber: 6,
        chapterTitle: '2-bob: Kapitan halokati',
        content: `Dik Send chuqur qayg‘uga botdi, ammo u o‘ziga kelishga majbur edi. U missis Ueldonning ko‘zlariga qaradi:\n\n— Missis Ueldon! Qolganlarning hayoti mening zimmamda. Men o‘n besh yoshdaman, ammo barchamizni qutqarish uchun bor kuchim bilan kurashaman!`
      },
      {
        pageNumber: 7,
        chapterTitle: '2-bob: Kapitan halokati',
        content: `U kemani boshqarishni o‘z qo‘liga oldi. Negoro esa bu holatdan o‘zining qora niyatlari yo‘lida foydalanishni rejalashtira boshladi.`
      },
      {
        pageNumber: 8,
        chapterTitle: '2-bob: Kapitan halokati',
        content: `Kemada omon qolgan qora tanli do‘stlar — Tom, Bet, Ostin Dik Sendga sidqidildan yordam bera boshladilar. Yosh kapitan har bir yelkan va shamolni hisobga olardi.`
      },
      {
        pageNumber: 9,
        chapterTitle: '3-bob: Kompasning buzilishi',
        content: `Bir kecha hamma uxlaganda Negoro yashirincha palubaga chiqdi. U asosiy kompas ostiga temir parchasi qo‘yib, uning magnit milini ataylab burib qo‘ydi!\n\nIkkinchi kompasni esa yashirincha sindirib tashladi. Dik Send kemani Janubiy Amerika tomon suzib ketyapmiz deb o‘ylar, aslida esa kema dahshatli Afrika qirg‘oqlari tomon ketayotgan edi!`
      },
      {
        pageNumber: 10,
        chapterTitle: '3-bob: Kompasning buzilishi',
        content: `Bo‘ronlar kemani holdan toydirdi. Dik Send kunda-kunora yelkanlarni to‘g‘rilab, uxlash nimaligini unutmadi. Uning irodasi har qanday balog‘at yoshidagi kishinikidan baquvvatroq edi.`
      },
      {
        pageNumber: 11,
        chapterTitle: '3-bob: Kompasning buzilishi',
        content: `Nihoyat, uzoqda yer qorasi ko‘rindi! Hamma quvondi. Dik Send bu Janubiy Amerika deb ishondi, ammo Negoroning yuzida xunuk tabassum paydo bo‘ldi.`
      },
      {
        pageNumber: 12,
        chapterTitle: '3-bob: Kompasning buzilishi',
        content: `Kema qirg‘oq qoyalariga urilib chil-parchin bo‘ldi, ammo barcha yo‘lovchilar sohilga eson-omon chiqib oldilar.`
      },
      {
        pageNumber: 13,
        chapterTitle: "4-bob: Noma'lum qirg‘oqlar",
        content: `Ular qirg‘oq bo‘ylab yurar ekanlar, birorta Janubiy Amerikaga xos hayvon yoki o‘simlikni ko‘rmadilar. Aksincha, sherlar, jirafalar va begemotlar izlari uchradi.\n\nDik Send dahshat bilan tushundi: ular Amerikada emas, qul savdogarlari izg‘ib yurgan qonli Afrikada edilar!`
      },
      {
        pageNumber: 14,
        chapterTitle: "4-bob: Noma'lum qirg‘oqlar",
        content: `Negoro aslida qul savdogarlarining agenti bo‘lib, Dingoning sobiq egasi bo‘lgan sayyohni ham aynan u o‘ldirgan edi. Dingo buni bilgani uchun unga tashlanar edi.`
      },
      {
        pageNumber: 15,
        chapterTitle: 'Xulosa',
        content: `Dik Send do‘stlari va missis Ueldonni qutqarish uchun mislsiz qahramonliklar ko‘rsatdi. O‘n besh yoshli yigitning aql-zakovati va jasorati barcha dushmanlarni yengib chiqdi.\n\nJyul Vernning ushbu romani yoshlarga matonat, sadoqat va insoniy burch har qanday mushkul vaziyatda ham najot keltirishini uqtiradi.`
      }
    ]
  },
  {
    id: 'kecha-va-kunduz',
    title: 'Kecha va Kunduz',
    author: 'Abdulhamid Cho‘lpon',
    categoryId: 'ozbek-adabiyoti',
    genre: 'Roman',
    coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80',
    description: "Jadid adabiyotining ulug‘ namunasi. Zebi, Miryoqub, Akbarali mingboshi timsolida Turkistonning turg‘unlik davridagi ma'naviy fojeasi va uyg‘onish orzulari «Kunduz» qismida ko‘rsatilgan o‘lmas asar.",
    language: 'uz',
    ageRating: '16+',
    price: 0,
    isFree: true,
    rating: 4.9,
    ratingCount: 280,
    pageCount: 12,
    fileType: 'reader',
    licenseInfo: 'Ochiq litsenziya / Jamoat mulki',
    publisher: 'Adabiyot va san‘at nashriyoti',
    publishedYear: 1936,
    isActive: true,
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Kecha',
        content: `Zebi — buloq suvidek tiniq, yosh va orzularga to‘la qiz. Uning yagona aybi — o‘z erki va ovoziga ega bo‘lmagan bir zamonda dunyoga kelganida edi.\n\nRazzoq so‘fi o‘zining ko‘r mutaassibligi bilan qizining orzularini bo‘g‘ardi. Bahor kelganda dalalar gulga to‘lar, Zebi dugonalari bilan ashula aytgisi kelardi, ammo so‘fining sovuq nigohi har qanday quvonchni so‘ndirardi.`
      },
      {
        pageNumber: 2,
        chapterTitle: 'Kecha',
        content: `Mingboshi Akbarali boylik va amalda sarxush bir kimsa edi. U to‘rtinchi xotinlikka Zebini ko‘z ostiga oldi. Zebi qismatining qora tuni mana shunday boshlandi.\n\nCho‘lpon «Kecha» orqali xalqning jaholat uyqusida yotganini, erkin fikr va ayol huquqlarining poymol bo‘lganini aytib faryod chekadi.`
      }
    ]
  },
  {
    id: 'sariq-devni-minib',
    title: 'Sariq devni minib',
    author: 'Xudoyberdi To‘xtaboyev',
    categoryId: 'bolalar',
    genre: 'Sarguzasht-fantastika',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    description: 'Hoshimjonning sehrli shlyapa topib olishi, dangasalik oqibatlari va qiziqarli sarguzashtlari orqali bolalarga halol mehnat va o‘qishning qadrini o‘rgatuvchi mashhur qissa.',
    language: 'uz',
    ageRating: '10+',
    price: 20000,
    isFree: false,
    rating: 4.9,
    ratingCount: 410,
    pageCount: 16,
    fileType: 'reader',
    licenseInfo: 'Mualliflik huquqi bilan himoyalangan',
    publisher: 'Yangi Asr Avlodi',
    publishedYear: 1968,
    isActive: true,
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Hoshimjonning boshlanishi',
        content: `Mening ismim Hoshimjon. To‘g‘risini aytsam, unchalik tirishqoq bola emasdim. Ertalab maktabga borishdan ko‘ra uyda uxlash yoki do‘stlarim bilan futbol o‘ynashni afzal ko‘rardim.\n\nKunlardan bir kuni tomorqamizdagi eski qutidan bir qiziq shlyapa topib oldim. Uni boshimga kiygan edim, ko‘zguda o‘zimni ko‘rmay qoldim! Men ko‘rinmas bo‘lib qolgan edim!`
      },
      {
        pageNumber: 2,
        chapterTitle: 'Sehrli shlyapa sarguzashti',
        content: `Endi o‘qimasdan besh baho olaman, deb o‘yladim. Ammo mehnat qilmasdan erishilgan har qanday narsa oxir-oqibat kulfat keltirishini hali bilmasdim...\n\nSariq dev — bu inson ichidagi dangasalik va xudbinlikdir!`
      }
    ]
  },
  {
    id: 'sherlok-xolms',
    title: 'Sherlok Xolms sarguzashtlari',
    author: 'Artur Konan Doyl',
    categoryId: 'sarguzasht',
    genre: 'Detektiv',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
    description: 'Beyker-strit 221-B xonadonidagi dahshatli jumboqlar, deduktiv metod asoschisi Sherlok Xolms va doktor Votsonning mashhur tergovlari to‘plami.',
    language: 'uz',
    ageRating: '12+',
    price: 22000,
    isFree: false,
    rating: 4.8,
    ratingCount: 390,
    pageCount: 20,
    fileType: 'reader',
    licenseInfo: 'Ochiq litsenziya / Jamoat mulki',
    publisher: 'Davr nashriyoti',
    publishedYear: 1892,
    isActive: true,
    pages: [
      {
        pageNumber: 1,
        chapterTitle: "Deduksiya san'ati",
        content: `Sherlok Xolms uchun inson ko‘zi ilg‘amaydigan mayda detallar butun haqiqatni ochib beruvchi kalit edi.\n\n— Siz shunchaki ko‘rasiz, Votson, ammo kuzatmaysiz! — derdi u quvurini tutatib. — Masalan, bu xonaga olib chiquvchi zinapoya necha pog‘onadan iborat?\n— Bilmayman, Xolms.\n— O‘n yetti pog‘ona! Chunki men uni ham ko‘rdim, ham kuzatdim.`
      }
    ]
  },
  {
    id: 'ozbegim',
    title: 'O‘zbegim (Tanlangan she‘rlar)',
    author: 'Erkin Vohidov',
    categoryId: 'sheriyat',
    genre: 'She‘riyat',
    coverUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
    description: 'O‘zbek xalqining tarixi, qadd-qomati, shon-sharafi va ruhiyati madh etilgan mashhur «O‘zbegim» qasidasi va dilbar g‘azallar jamlangan to‘plam.',
    language: 'uz',
    ageRating: 'Barchaga',
    price: 12000,
    isFree: false,
    rating: 5.0,
    ratingCount: 450,
    pageCount: 10,
    fileType: 'reader',
    licenseInfo: 'Mualliflik huquqi bilan himoyalangan',
    publisher: 'O‘zbekiston nashriyoti',
    publishedYear: 1968,
    isActive: true,
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'O‘zbegim qasidasi',
        content: `Tarixingdir ming asrlar\nIchra pinhon, o‘zbegim,\nSenga tengdosh Pomiru\nOqsoch Tiyonshon, o‘zbegim.\n\nSo‘ylasin Afrosiyobu\nSo‘ylasin O‘rxun xati,\nKo‘hna tarix shodasida\nBitta marjon, o‘zbegim.\n\nAl-Beruniy, Al-Xorazmiy,\nIbn Sino shon ila\nJahon ichra kashf etilgan\nBuyuk jahon, o‘zbegim.`
      }
    ]
  },
  {
    id: 'yillar-armoni',
    title: 'Yillar armoni',
    author: 'Abdulla Oripov',
    categoryId: 'sheriyat',
    genre: 'She‘riyat',
    coverUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80',
    description: 'O‘zbekiston Qahramoni Abdulla Oripovning eng sara she‘rlari, Vatan, ona, muhabbat va insoniy iztiroblar falsafasi aks etgan she‘riy majmua.',
    language: 'uz',
    ageRating: 'Barchaga',
    price: 18000,
    isFree: false,
    rating: 4.9,
    ratingCount: 320,
    pageCount: 12,
    fileType: 'reader',
    licenseInfo: 'Mualliflik huquqi bilan himoyalangan',
    publisher: 'Sharq nashriyoti',
    publishedYear: 1983,
    isActive: true,
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'O‘zbekiston',
        content: `Yurtim, seni ko‘p sevardim,\nLekin sevgim oz ekan.\nSendan ketgach bildim buni,\nHar kuning bir yoz ekan.\n\nMen dunyoni kezib chiqdim,\nKo‘rdim ne-ne yurtlarni,\nAmmo topmadim hech qayda\nSen kabi xushxurlarni...`
      }
    ]
  },
  {
    id: 'tom-soyer',
    title: 'Tom Soyerning sarguzashtlari',
    author: 'Mark Tven',
    categoryId: 'jahon-adabiyoti',
    genre: 'Klassik sarguzasht',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    description: 'Missisipi daryosi bo‘yidagi beqiyos bolalik, Tom Soyer va Geklberri Finning sarguzashtlari, devor oqlash sahnasi va qaroqchilar xazinasi qissasi.',
    language: 'uz',
    ageRating: 'Barchaga',
    price: 0,
    isFree: true,
    rating: 4.8,
    ratingCount: 512,
    pageCount: 14,
    fileType: 'reader',
    licenseInfo: 'Ochiq litsenziya / Jamoat mulki',
    publisher: 'Cho‘lpon nashriyoti',
    publishedYear: 1876,
    isActive: true,
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Devor oqlash mo‘jizasi',
        content: `Shanba tongi yorug‘ va beg‘ubor edi. Hamma o‘rtoqlari daryoga cho‘milgani ketishgan bir paytda, Tom xolasi Polli buyurgan o‘ttiz metrli devorni oqlashi kerak edi.\n\nTom cho‘tkani ohak idishiga botirib, chuqur xo‘rsindi. Shu payt uzoqdan Ben Rojers olma yeb, paroxod bo‘lib o‘ynab kelayotganini ko‘rdi.\n\nTom aqlini ishlatdi: u g‘amgin qiyofasini o‘zgartirib, devorga xuddi buyuk rassomdek zavq bilan ohak surta boshladi...`
      }
    ]
  }
];
