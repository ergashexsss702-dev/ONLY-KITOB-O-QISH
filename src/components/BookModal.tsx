import React, { useEffect } from 'react';
import { 
  X, 
  BookOpen, 
  Heart, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  Calendar, 
  Building2, 
  FileText
} from 'lucide-react';
import { Book, Language, ThemeMode } from '../types';
import { translations } from '../data/translations';

interface BookModalProps {
  book: Book;
  onClose: () => void;
  language: Language;
  theme: ThemeMode;
  isFavorite: boolean;
  isPurchased: boolean;
  onToggleFavorite: (bookId: string) => void;
  onStartReading: (book: Book) => void;
  onBuyBook: (book: Book) => void;
}

export const BookModal: React.FC<BookModalProps> = ({
  book,
  onClose,
  language,
  theme,
  isFavorite,
  isPurchased,
  onToggleFavorite,
  onStartReading,
  onBuyBook
}) => {
  const t = translations[language];
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const canRead = book.isFree || isPurchased;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className={`relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border transition-colors ${
          isDark 
            ? 'bg-zinc-950 border-purple-900/40 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
            isDark ? 'bg-zinc-900/80 hover:bg-zinc-800 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          {/* Cover & Quick Stats (Left Column) */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative aspect-[3/4] w-full max-w-[260px] rounded-2xl overflow-hidden shadow-xl bg-zinc-900 border border-purple-500/20">
              <img
                src={book.coverUrl}
                alt={book.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-black/70 backdrop-blur-md text-purple-300 border border-purple-500/30">
                  {book.ageRating}
                </span>
              </div>
            </div>

            {/* Price / Status pill box */}
            <div className="mt-4 text-center">
              {book.isFree ? (
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.free}</span>
                </div>
              ) : isPurchased ? (
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.alreadyPurchased}</span>
                </div>
              ) : (
                <div className="text-xl font-bold font-display text-purple-400">
                  {book.price.toLocaleString()} {t.som}
                </div>
              )}
            </div>

            {/* Rating display */}
            {book.rating > 0 && (
              <div className="mt-2 flex items-center gap-1.5 text-sm text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-slate-200">{book.rating.toFixed(1)}</span>
                <span className="text-slate-400 text-xs">({book.ratingCount} baho)</span>
              </div>
            )}
          </div>

          {/* Book Details (Right Column) */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Category & Title */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                  {book.genre}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif mt-1">
                  {book.title}
                </h2>
                <div className="text-base text-slate-400 font-medium mt-1">
                  {book.author}
                </div>
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-purple-900/20 text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-400">{t.pages}:</span>
                  <span className="font-semibold text-slate-200">{book.pageCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-400">{t.ageRating}:</span>
                  <span className="font-semibold text-slate-200">{book.ageRating}</span>
                </div>
                {book.publishedYear && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span className="text-slate-400">{t.publishedYear}:</span>
                    <span className="font-semibold text-slate-200">{book.publishedYear}</span>
                  </div>
                )}
                {book.publisher && (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-400" />
                    <span className="text-slate-400">{t.publisher}:</span>
                    <span className="font-semibold text-slate-200 truncate">{book.publisher}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Kitob haqida
                </h4>
                <p className="text-sm leading-relaxed text-slate-300">
                  {book.description}
                </p>
              </div>

              {/* Table of Contents / Chapters */}
              {book.chapters && book.chapters.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Mundarija (Boblar)
                  </h4>
                  <div className="space-y-1 max-h-36 overflow-y-auto pr-2 text-xs">
                    {book.chapters.map((ch, idx) => (
                      <div 
                        key={ch.id || idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-purple-950/20 border border-purple-900/20 text-slate-300"
                      >
                        <span className="truncate">{ch.title}</span>
                        <span className="text-purple-400 font-mono text-[11px] shrink-0">sahifa {ch.startPage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* License Notice */}
              <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/30 text-[11px] text-slate-400 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{book.licenseInfo}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center gap-3">
              {canRead ? (
                <button
                  onClick={() => {
                    onClose();
                    onStartReading(book);
                  }}
                  className="flex-1 py-3 px-6 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t.readBook}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onBuyBook(book);
                  }}
                  className="flex-1 py-3 px-6 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.buyBook} ({book.price.toLocaleString()} {t.som})</span>
                </button>
              )}

              {/* Favorite Button */}
              <button
                onClick={() => onToggleFavorite(book.id)}
                className={`p-3 rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
                  isFavorite
                    ? 'border-rose-500/40 bg-rose-500/15 text-rose-400'
                    : isDark ? 'border-purple-900/40 hover:bg-purple-950/30 text-slate-300' : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                }`}
                title={isFavorite ? t.removeFromFavorites : t.addToFavorites}
                aria-label={isFavorite ? t.removeFromFavorites : t.addToFavorites}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
