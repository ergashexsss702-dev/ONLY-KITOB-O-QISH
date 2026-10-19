-- ONLY KITOB O‘QISH — Sample Seed Data for Categories and Classics
INSERT INTO public.categories (id, name_uz, name_ru, name_en, icon, display_order)
VALUES
('tavsiyalar', 'Siz uchun tavsiyalar', 'Рекомендовано вам', 'Recommended for You', 'Sparkles', 1),
('yoshga-mos', 'Yoshga mos kitoblar', 'По возрасту', 'Age Appropriate', 'UserCheck', 2),
('mashhur', 'Mashhur kitoblar', 'Популярные книги', 'Popular Books', 'TrendingUp', 3),
('yangi', 'Yangi kitoblar', 'Новинки', 'New Arrivals', 'Clock', 4),
('ozbek-adabiyoti', 'O‘zbek adabiyoti', 'Узбекская литература', 'Uzbek Literature', 'BookOpen', 5),
('jahon-adabiyoti', 'Jahon adabiyoti', 'Мировая литература', 'World Literature', 'Globe', 6),
('sheriyat', 'She‘riyat', 'Поэзия', 'Poetry', 'Feather', 7),
('sarguzasht', 'Sarguzasht', 'Приключения', 'Adventure', 'Compass', 8),
('fantastika', 'Fantastika', 'Фантастика', 'Sci-Fi & Fantasy', 'Rocket', 9),
('talimiy', 'Ta‘limiy kitoblar', 'Образовательные', 'Educational', 'GraduationCap', 10),
('bolalar', 'Bolalar adabiyoti', 'Детская литература', 'Children Literature', 'Smile', 11),
('bepul', 'Bepul kitoblar', 'Бесплатные книги', 'Free Books', 'Gift', 12)
ON CONFLICT (id) DO NOTHING;
