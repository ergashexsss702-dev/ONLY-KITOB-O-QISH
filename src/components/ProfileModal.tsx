import React, { useState } from 'react';
import { 
  X, 
  User, 
  BookOpen, 
  Heart, 
  ShoppingBag, 
  LogOut, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { Book, Language, ThemeMode, UserProfile, ReadingProgress, PurchaseRecord } from '../types';
import { translations } from '../data/translations';

interface ProfileModalProps {
  user: UserProfile;
  books: Book[];
  favoriteIds: string[];
  readingHistory: Record<string, ReadingProgress>;
  purchases: PurchaseRecord[];
  onClose: () => void;
  onLogout: () => void;
  onSelectBookToRead: (book: Book) => void;
  onViewBook: (book: Book) => void;
  language: Language;
  theme: ThemeMode;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  user,
  books,
  favoriteIds,
  readingHistory,
  purchases,
  onClose,
  onLogout,
  onSelectBookToRead,
  onViewBook,
  language,
  theme
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'favorites' | 'purchases'>('history');
  const t = translations[language];
  const isDark = theme === 'dark';

  // Mask phone number for privacy: e.g. +998 90 123 45 67 -> +998 90 ••• •• 67
  const maskPhone = (phoneStr: string): string => {
    const parts = phoneStr.split(' ');
    if (parts.length >= 5) {
      return `${parts[0]} ${parts[1]} ••• •• ${parts[4]}`;
    }
    return phoneStr.replace(/\d(?=\d{2})/g, '•');
  };

  // Get books in favorites
  const favoriteBooks = books.filter((b) => favoriteIds.includes(b.id));

  // Get books in reading history sorted by lastReadAt
  const historyList = Object.values(readingHistory)
    .map((prog) => {
      const book = books.find((b) => b.id === prog.bookId);
      return { prog, book };
    })
    .filter((item): item is { prog: ReadingProgress; book: Book } => item.book !== undefined)
    .sort((a, b) => new Date(b.prog.lastReadAt).getTime() - new Date(a.prog.lastReadAt).getTime());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className={`relative w-full max-w-2xl rounded-3xl overflow-hidden border shadow-2xl transition-colors ${
          isDark 
            ? 'bg-zinc-950 border-purple-900/40 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="p-6 border-b border-purple-900/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-600/30">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-bold font-display">{user.fullName}</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{user.age} yosh</span>
                <span>·</span>
                <span className="font-mono text-[11px] text-purple-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {maskPhone(user.phone)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer text-xs flex items-center gap-1 border border-transparent hover:border-rose-500/30"
              title={t.logout}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{t.logout}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-purple-900/20 px-6 pt-2">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'history'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{t.readingHistoryTab}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-900/40 text-purple-300 font-mono">
              {historyList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'favorites'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>{t.favoritesTab}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-900/40 text-purple-300 font-mono">
              {favoriteBooks.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('purchases')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'purchases'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t.purchasesTab}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-900/40 text-purple-300 font-mono">
              {purchases.length}
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[50vh] overflow-y-auto space-y-3">
          {activeTab === 'history' && (
            historyList.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 space-y-2">
                <BookOpen className="w-8 h-8 text-purple-500/40 mx-auto" />
                <p>{t.noHistoryYet}</p>
              </div>
            ) : (
              historyList.map(({ prog, book }) => (
                <div
                  key={book.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/40 border border-purple-900/20 hover:border-purple-500/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-10 h-14 rounded-lg object-cover bg-zinc-900"
                    />
                    <div>
                      <h4 className="text-sm font-semibold font-serif text-white line-clamp-1">
                        {book.title}
                      </h4>
                      <p className="text-xs text-slate-400">{book.author}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-24 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                          <div
                            className="h-full bg-purple-500"
                            style={{ width: `${prog.progressPercent}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-purple-400">
                          {prog.currentPage} / {prog.totalPages} ({prog.progressPercent}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectBookToRead(book);
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-600 text-white hover:bg-purple-500 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>{t.continueReading}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )
          )}

          {activeTab === 'favorites' && (
            favoriteBooks.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 space-y-2">
                <Heart className="w-8 h-8 text-rose-500/40 mx-auto" />
                <p>{t.noFavoritesYet}</p>
              </div>
            ) : (
              favoriteBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/40 border border-purple-900/20 hover:border-purple-500/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-10 h-14 rounded-lg object-cover bg-zinc-900"
                    />
                    <div>
                      <h4 className="text-sm font-semibold font-serif text-white line-clamp-1">
                        {book.title}
                      </h4>
                      <p className="text-xs text-slate-400">{book.author} · {book.genre}</p>
                      <span className="text-[11px] font-semibold text-purple-400">
                        {book.isFree ? t.free : `${book.price.toLocaleString()} ${t.som}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onViewBook(book);
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium border border-zinc-700 text-slate-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      {t.viewBook}
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectBookToRead(book);
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-600 text-white hover:bg-purple-500 transition-colors cursor-pointer"
                    >
                      {t.readBook}
                    </button>
                  </div>
                </div>
              ))
            )
          )}

          {activeTab === 'purchases' && (
            purchases.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 space-y-2">
                <ShoppingBag className="w-8 h-8 text-purple-500/40 mx-auto" />
                <p>{t.noPurchasesYet}</p>
              </div>
            ) : (
              purchases.map((rec) => (
                <div
                  key={rec.id}
                  className="p-3.5 rounded-2xl bg-zinc-900/40 border border-purple-900/20 flex items-center justify-between text-xs"
                >
                  <div>
                    <h4 className="font-semibold text-sm text-white">{rec.bookTitle}</h4>
                    <div className="text-slate-400 text-[11px] mt-0.5">
                      To‘lov turi: <span className="uppercase font-mono text-purple-300">{rec.paymentMethod}</span> · {new Date(rec.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                      Tranzaksiya ID: {rec.transactionId}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-purple-400 font-mono">
                      {rec.amount.toLocaleString()} {t.som}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      Muvaffaqiyatli
                    </span>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};
