export type Language = 'uz' | 'ru' | 'en';

export type AgeRating = 'Barchaga' | '10+' | '12+' | '16+' | '18+';

export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  fullName: string;
  age: number;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface BookChapter {
  id: string;
  title: string;
  startPage: number;
}

export interface BookPage {
  pageNumber: number;
  chapterTitle?: string;
  content: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  categoryId: string;
  genre: string;
  coverUrl: string;
  description: string;
  language: Language;
  ageRating: AgeRating;
  price: number; // 0 = Free
  isFree: boolean;
  rating: number;
  ratingCount: number;
  pageCount: number;
  pdfUrl?: string;
  fileType: 'pdf' | 'reader' | 'epub';
  licenseInfo: string;
  publisher?: string;
  publishedYear?: number;
  isActive: boolean;
  chapters?: BookChapter[];
  pages?: BookPage[];
}

export interface ReadingProgress {
  bookId: string;
  currentPage: number;
  totalPages: number;
  progressPercent: number;
  lastReadAt: string;
  completed: boolean;
}

export interface PurchaseRecord {
  id: string;
  userId: string;
  bookId: string;
  bookTitle: string;
  amount: number;
  paymentMethod: 'payme' | 'click' | 'uzum';
  status: 'completed' | 'pending' | 'failed';
  transactionId: string;
  createdAt: string;
}

export type ThemeMode = 'dark' | 'light';

export type BackgroundPreset = 'default' | 'stars' | 'aurora' | 'classic_library' | 'obsidian' | 'parchment';

export interface UserPreferences {
  theme: ThemeMode;
  language: Language;
  backgroundPreset: BackgroundPreset;
  customBgUrl?: string;
  bgDimness: number; // 0 to 90
  starsAnimation: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  readerFont: 'serif' | 'sans' | 'mono';
  readerTheme: 'dark' | 'sepia' | 'light' | 'night';
}

export interface Category {
  id: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  icon: string;
  displayOrder: number;
}
