import { Book, UserProfile, ReadingProgress, PurchaseRecord, UserPreferences } from '../types';
import { initialBooks } from '../data/initialBooks';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEYS = {
  PROFILE: 'only_kitob_profile',
  BOOKS: 'only_kitob_books',
  FAVORITES: 'only_kitob_favorites',
  PROGRESS: 'only_kitob_progress',
  PURCHASES: 'only_kitob_purchases',
  PREFERENCES: 'only_kitob_preferences',
  ADMIN_TOKEN: 'only_kitob_admin_token'
};

const defaultPreferences: UserPreferences = {
  theme: 'dark',
  language: 'uz',
  backgroundPreset: 'default',
  bgDimness: 40,
  starsAnimation: true,
  fontSize: 'medium',
  readerFont: 'serif',
  readerTheme: 'dark'
};

/**
 * Maps raw database row (snake_case) or localStorage object to consistent Book interface
 */
export function mapDbBookToBook(row: any): Book {
  const price = Number(row.price) || 0;
  return {
    id: String(row.id),
    title: row.title || 'Nomsiz asar',
    author: row.author || 'Noma‘lum muallif',
    categoryId: row.category_id || row.categoryId || 'ozbek-adabiyoti',
    genre: row.genre || 'Mumtoz adabiyot',
    coverUrl: row.cover_url || row.coverUrl || '/src/assets/images/book_cover_otkan_kunlar_1792381373922.jpg',
    description: row.description || '',
    language: row.language || 'uz',
    ageRating: row.age_rating || row.ageRating || 'Barchaga',
    price,
    isFree: price === 0,
    rating: Number(row.rating) || 5.0,
    ratingCount: Number(row.rating_count ?? row.ratingCount) || 1,
    pageCount: Number(row.page_count ?? row.pageCount) || (row.pages ? row.pages.length : 20),
    pdfUrl: row.pdf_url || row.pdfUrl || undefined,
    fileType: row.file_type || row.fileType || 'reader',
    licenseInfo: row.license_info || row.licenseInfo || 'Ochiq litsenziya / Jamoat mulki',
    publisher: row.publisher || undefined,
    publishedYear: row.published_year || row.publishedYear || undefined,
    isActive: row.is_active !== undefined ? Boolean(row.is_active) : (row.isActive !== undefined ? Boolean(row.isActive) : true),
    chapters: Array.isArray(row.chapters) ? row.chapters : undefined,
    pages: Array.isArray(row.pages) ? row.pages : undefined,
  };
}

export const storage = {
  // Profiles
  getProfile: (): UserProfile | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setProfile: (profile: UserProfile): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving profile to localStorage', e);
    }
  },

  clearProfile: (): void => {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
  },

  // Synchronous books getter (from local cache / seeded initialBooks)
  getBooks: (): Book[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(mapDbBookToBook);
        }
      }
    } catch {
      // Fallback
    }
    // Seed initially
    storage.saveBooks(initialBooks);
    return initialBooks;
  },

  saveBooks: (books: Book[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
    } catch (e) {
      console.error('Error saving books', e);
    }
  },

  // Asynchronous database loader with Supabase fallback
  fetchBooksAsync: async (): Promise<{ books: Book[]; source: 'supabase' | 'local'; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('books')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Supabase books query returned error, falling back to local database:', error.message);
          return {
            books: storage.getBooks(),
            source: 'local',
            error: error.message
          };
        }

        if (data && data.length > 0) {
          const mappedBooks = data.map(mapDbBookToBook);
          storage.saveBooks(mappedBooks);
          return { books: mappedBooks, source: 'supabase' };
        }
      } catch (err: any) {
        console.warn('Network error connecting to Supabase:', err);
        return {
          books: storage.getBooks(),
          source: 'local',
          error: err?.message || 'Tarmoq xatosi'
        };
      }
    }

    // Default local repository
    return { books: storage.getBooks(), source: 'local' };
  },

  addOrUpdateBook: (book: Book): void => {
    const books = storage.getBooks();
    const index = books.findIndex(b => b.id === book.id);
    if (index >= 0) {
      books[index] = book;
    } else {
      books.unshift(book);
    }
    storage.saveBooks(books);

    // If Supabase is configured, upsert into database table asynchronously
    if (isSupabaseConfigured && supabase) {
      (async () => {
        try {
          await supabase.from('books').upsert({
            id: book.id,
            title: book.title,
            author: book.author,
            category_id: book.categoryId,
            genre: book.genre,
            cover_url: book.coverUrl,
            description: book.description,
            language: book.language,
            age_rating: book.ageRating,
            price: book.price,
            rating: book.rating,
            rating_count: book.ratingCount,
            page_count: book.pageCount,
            pdf_url: book.pdfUrl,
            file_type: book.fileType,
            license_info: book.licenseInfo,
            publisher: book.publisher,
            published_year: book.publishedYear,
            is_active: book.isActive,
          });
        } catch (err) {
          console.error('Error upserting to Supabase:', err);
        }
      })();
    }
  },

  deleteBook: (bookId: string): void => {
    const books = storage.getBooks().filter(b => b.id !== bookId);
    storage.saveBooks(books);

    if (isSupabaseConfigured && supabase) {
      (async () => {
        try {
          await supabase.from('books').delete().eq('id', bookId);
        } catch (err) {
          console.error('Error deleting from Supabase:', err);
        }
      })();
    }
  },

  // Favorites
  getFavorites: (): string[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleFavorite: (bookId: string): string[] => {
    const favorites = storage.getFavorites();
    const index = favorites.indexOf(bookId);
    let updated: string[];
    if (index >= 0) {
      updated = favorites.filter(id => id !== bookId);
    } else {
      updated = [...favorites, bookId];
    }
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return updated;
  },

  // Reading Progress
  getAllProgress: (): Record<string, ReadingProgress> => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  getProgress: (bookId: string): ReadingProgress | null => {
    const all = storage.getAllProgress();
    return all[bookId] || null;
  },

  saveProgress: (progress: ReadingProgress): void => {
    try {
      const all = storage.getAllProgress();
      all[progress.bookId] = progress;
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(all));
    } catch (e) {
      console.error('Error saving progress', e);
    }
  },

  // Purchases
  getPurchases: (): PurchaseRecord[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PURCHASES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addPurchase: (record: PurchaseRecord): void => {
    try {
      const current = storage.getPurchases();
      if (!current.some(p => p.bookId === record.bookId)) {
        current.unshift(record);
        localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(current));
      }
    } catch (e) {
      console.error('Error saving purchase', e);
    }
  },

  isBookPurchased: (bookId: string): boolean => {
    const purchases = storage.getPurchases();
    return purchases.some(p => p.bookId === bookId && p.status === 'completed');
  },

  // User Preferences
  getPreferences: (): UserPreferences => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (data) {
        return { ...defaultPreferences, ...JSON.parse(data) };
      }
    } catch {
      // fallback
    }
    return defaultPreferences;
  },

  savePreferences: (prefs: Partial<UserPreferences>): UserPreferences => {
    try {
      const current = storage.getPreferences();
      const updated = { ...current, ...prefs };
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Error saving preferences', e);
      return defaultPreferences;
    }
  },

  // Admin access
  isAdminAuthenticated: (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN) === 'admin_verified';
  },

  setAdminAuthenticated: (auth: boolean): void => {
    if (auth) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, 'admin_verified');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
    }
  }
};
