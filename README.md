# ONLY KITOB O‘QISH — Premium Online Library

> Professional, zamonaviy va to‘liq ishlaydigan onlayn kitob o‘qish veb-platformasi.

## Loyihaning asosiy imkoniyatlari

1. **Kitoblar katalogi va saralash**:
   - O‘zbek adabiyoti durdonalari (Alisher Navoiy, Abdulla Qodiriy, Z.M. Bobur, Cho‘lpon)
   - Jahon mumtoz adabiyoti (Antuan de Sent-Ekzyuperi, Jyul Vern, Mark Tven, Artur Konan Doyl)
   - Bepul va pullik kitoblar filtrlari
   - Yosh toifalari bo‘yicha moslashtirish (Barchaga, 10+, 12+, 16+, 18+)

2. **Haqiqiy matnli va PDF o‘qish oynasi (Book Reader)**:
   - Silliq sahifa almashtirish (oldingi/keyingi, klaviatura strelkalari)
   - Sahifa raqamini kiritib to‘g‘ridan-to‘g‘ri o‘tish
   - Kattalashtirish / Kichraytirish (Masshtab: 75% — 150%)
   - To‘liq ekran (Fullscreen) rejimi
   - Shrift o‘lchamini o‘zgartirish (Kichik, O‘rtacha, Katta, Juda katta)
   - Shrift turini tanlash (Lora Serif, Sans UI, Monospace)
   - O‘qish fonini sozlash (Tungi, Sepiya, Kunduzgi oq, OLED qora)
   - O‘qish jarayonini foizda (%) ko‘rsatish va oxirgi o‘qilgan sahifani avtomatik saqlash

3. **Orqa fonni erkin sozlash**:
   - Tayyor fon mavzulari (Grand Library, Yulduzli kecha, Binafsha nur, Obsidian, Qog‘oz)
   - Qurilmadan (kompyuter/telefon) o‘z rasmini yuklash (JPG, PNG, WebP, max 5MB)
   - Fon qorong‘iligini sozlash (Dimness slider: 0% — 90%)
   - Harakatlanuvchi miltillovchi yulduzlar animatsiyasi (yoqish/o‘chirish)
   - Standart holatga qaytarish

4. **Foydalanuvchi profili va xavfsizligi**:
   - O‘zbekiston telefon formati: `+998 XX XXX XX XX`
   - Himoyalangan telefon ko‘rinishi (`+998 90 ••• •• 67`)
   - O‘qish tarixi va qolgan joyidan davom ettirish
   - Sevimli kitoblar ro‘yxati
   - Xaridlar jurnali

5. **Ko‘p tillilik (Multilingual)**:
   - O‘zbek tili (Lotin yozuvida)
   - Rus tili
   - Ingliz tili

6. **Himoyalangan Admin Paneli**:
   - Parol bilan himoyalangan (standart parol: `admin2026`)
   - Yangi kitob qo‘shish va mavjud kitoblarni tahrirlash
   - Kitobni yashirish yoki o‘chirish
   - Xaridlar audit logini ko‘rish

---

## O‘rnatish va Ishga Tushirish

### 1. Mahalliy rivojlantirish (Local development)

```bash
# Bog‘liqliklarni o‘rnatish
npm install

# Dasturni ishga tushirish (port 3000)
npm run dev

# Dasturni ishlab chiqarish uchun yig‘ish (build)
npm run build
```

### 2. Supabase sozlamalari (Ixtiyoriy bulut sinxronizatsiyasi)

Loyiha standart holatda `localStorage` orqali to‘liq ishlaydi. Agar bulutli PostgreSQL bazasini ulamoqchi bo‘lsangiz:

1. [supabase.com](https://supabase.com) saytida yangi loyiha oching.
2. **SQL Editor** bo‘limiga kiring va quyidagi fayl mazmunini ishga tushiring:
   - `/supabase/migrations/20261019000000_init_schema.sql` (jadvallar va RLS siyosatlari)
   - `/supabase/seed.sql` (boshlang‘ich kategoriyalar)
3. `.env` faylingizga loyiha kalitlarini kiriting:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

### 3. Vercel va GitHub orqali deploy qilish

1. Loyihani GitHub repozitoriyangizga push qiling.
2. [Vercel](https://vercel.com) orqali GitHub repozitoriyasini ulang.
3. Build buyrug‘i: `npm run build`
4. Chiqish papkasi: `dist`
5. Atrof-muhit o‘zgaruvchilarini (agar Supabase ulanayotgan bo‘lsa) Vercel Environment Variables bo‘limiga qo‘shing.
