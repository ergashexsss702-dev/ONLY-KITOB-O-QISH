import { Book, UserProfile, ReadingProgress, PurchaseRecord, UserPreferences } from '../types';
import { initialBooks } from '../data/initialBooks';

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

  // Books
  getBooks: (): Book[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
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

  addOrUpdateBook: (book: Book): void => {
    const books = storage.getBooks();
    const index = books.findIndex(b => b.id === book.id);
    if (index >= 0) {
      books[index] = book;
    } else {
      books.unshift(book);
    }
    storage.saveBooks(books);
  },

  deleteBook: (bookId: string): void => {
    const books = storage.getBooks().filter(b => b.id !== bookId);
    storage.saveBooks(books);
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
      // avoid duplicates
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
