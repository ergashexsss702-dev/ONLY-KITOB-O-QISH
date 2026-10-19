-- ONLY KITOB O‘QISH — Database Schema & Row Level Security Policies
-- Supabase PostgreSQL Migration

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    age INTEGER CHECK (age >= 4 AND age <= 120),
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. CATEGORIES / GENRES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name_uz TEXT NOT NULL,
    name_ru TEXT NOT NULL,
    name_en TEXT NOT NULL,
    icon TEXT,
    description TEXT,
    display_order INTEGER DEFAULT 0
);

-- 4. BOOKS TABLE
CREATE TABLE IF NOT EXISTS public.books (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    genre TEXT NOT NULL,
    cover_url TEXT NOT NULL,
    description TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'uz' CHECK (language IN ('uz', 'ru', 'en')),
    age_rating TEXT NOT NULL DEFAULT 'Barchaga', -- 'Barchaga', '12+', '16+', '18+'
    price INTEGER NOT NULL DEFAULT 0, -- 0 for Free (Bepul), amount in UZS for paid
    is_free BOOLEAN GENERATED ALWAYS AS (price = 0) STORED,
    rating NUMERIC(2,1) DEFAULT 5.0,
    rating_count INTEGER DEFAULT 1,
    page_count INTEGER NOT NULL DEFAULT 50,
    pdf_url TEXT,
    file_type TEXT DEFAULT 'pdf' CHECK (file_type IN ('pdf', 'epub', 'reader')),
    content TEXT, -- rich sample text / chapters for instant reader
    license_info TEXT NOT NULL DEFAULT 'Ochiq litsenziya / Jamoat mulki',
    publisher TEXT,
    published_year INTEGER,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. FAVORITES TABLE
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    book_id TEXT NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, book_id)
);

-- 6. READING PROGRESS & HISTORY TABLE
CREATE TABLE IF NOT EXISTS public.reading_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    book_id TEXT NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    current_page INTEGER NOT NULL DEFAULT 1,
    total_pages INTEGER NOT NULL DEFAULT 1,
    progress_percent INTEGER NOT NULL DEFAULT 0,
    last_read_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    completed BOOLEAN NOT NULL DEFAULT false,
    UNIQUE(user_id, book_id)
);

-- 7. PURCHASES TABLE
CREATE TABLE IF NOT EXISTS public.purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    book_id TEXT NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'payme', -- 'payme', 'click', 'uzum'
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    transaction_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, book_id)
);

-- 8. USER PREFERENCES TABLE
CREATE TABLE IF NOT EXISTS public.user_preferences (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    theme TEXT NOT NULL DEFAULT 'dark' CHECK (theme IN ('dark', 'light')),
    language TEXT NOT NULL DEFAULT 'uz' CHECK (language IN ('uz', 'ru', 'en')),
    background_preset TEXT NOT NULL DEFAULT 'default',
    custom_bg_url TEXT,
    bg_dimness INTEGER NOT NULL DEFAULT 40 CHECK (bg_dimness >= 0 AND bg_dimness <= 90),
    stars_animation BOOLEAN NOT NULL DEFAULT true,
    font_size TEXT NOT NULL DEFAULT 'medium',
    reader_font TEXT NOT NULL DEFAULT 'serif',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_books_category ON public.books(category_id);
CREATE INDEX IF NOT EXISTS idx_books_is_active ON public.books(is_active);
CREATE INDEX IF NOT EXISTS idx_books_search ON public.books USING gin(to_tsvector('simple', title || ' ' || author || ' ' || genre));
CREATE INDEX IF NOT EXISTS idx_reading_progress_user ON public.reading_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_user ON public.purchases(user_id);

-- 10. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current authenticated user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- CATEGORIES POLICIES
CREATE POLICY "Categories viewable by everyone"
    ON public.categories FOR SELECT
    USING (true);

CREATE POLICY "Categories manageable only by admin"
    ON public.categories FOR ALL
    USING (public.is_admin());

-- BOOKS POLICIES
CREATE POLICY "Active books are viewable by everyone"
    ON public.books FOR SELECT
    USING (is_active = true OR public.is_admin());

CREATE POLICY "Books insert/update/delete only by admin"
    ON public.books FOR ALL
    USING (public.is_admin());

-- FAVORITES POLICIES
CREATE POLICY "Users can view their own favorites"
    ON public.favorites FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites"
    ON public.favorites FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
    ON public.favorites FOR DELETE
    USING (auth.uid() = user_id);

-- READING PROGRESS POLICIES
CREATE POLICY "Users can manage their own reading progress"
    ON public.reading_progress FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- PURCHASES POLICIES
CREATE POLICY "Users can view their own purchases"
    ON public.purchases FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

-- Purchases should be created via verified server-side endpoints
CREATE POLICY "Purchases insertable by authenticated users or service role"
    ON public.purchases FOR INSERT
    WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- USER PREFERENCES POLICIES
CREATE POLICY "Users can manage their own preferences"
    ON public.user_preferences FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
