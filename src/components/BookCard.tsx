import React, { useState } from 'react';
import { Star, Heart, BookOpen } from 'lucide-react';
import { Book, Language, ThemeMode } from '../types';
import { translations } from '../data/translations';

interface BookCardProps {
  book: Book;
  language: Language;
  theme: ThemeMode;
  isFavorite: boolean;
  onToggleFavorite: (bookId: string) => void;
  onViewBook: (book: Book) => void;
  onReadBook: (book: Book) => void;
  readingProgressPercent?: number;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  language,
  theme,
  isFavorite,
  onToggleFavorite,
  onViewBook,
  onReadBook,
  readingProgressPercent
}) => {
  const [imgError, setImgError] = useState(false);
  const t = translations[language];
  const isDark = theme === 'dark';

  return (
    <div
      className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 border ${
        isDark
          ? 'bg-zinc-900/60 hover:bg-zinc-900/90 border-purple-900/20 hover:border-purple-600/50 shadow-lg shadow-black/40'
          : 'bg-white hover:bg-white border-slate-200 hover:border-purple-300 shadow-md hover:shadow-xl shadow-slate-200/50'
      }`}
    >
      {/* Cover Image Container (3:4 ratio) */}
      <div 
        onClick={() => onViewBook(book)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950 cursor-pointer select-none"
      >
        {!imgError ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-950 via-zinc-900 to-black text-center">
            <BookOpen className="w-10 h-10 text-purple-400 mb-2 opacity-60" />
            <span className="font-serif font-bold text-sm text-slate-200 line-clamp-2">{book.title}</span>
            <span className="text-xs text-purple-300 mt-1">{book.author}</span>
          </div>
        )}

        {/* Gradient Overlay for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/30 opacity-70 group-hover:opacity-50 transition-opacity" />

        {/* Top Badges: Age Rating & Price/Free */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-black/60 backdrop-blur-md text-purple-200 border border-purple-500/20">
            {book.ageRating}
          </span>

          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold backdrop-blur-md shadow-sm ${
            book.isFree 
              ? 'bg-emerald-600 text-white' 
              : 'bg-purple-600 text-white'
          }`}>
            {book.isFree ? t.free : `${book.price.toLocaleString()} ${t.som}`}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(book.id);
          }}
          className={`absolute bottom-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-transform duration-200 hover:scale-110 cursor-pointer ${
            isFavorite 
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30' 
              : 'bg-black/50 text-white hover:bg-black/80'
          }`}
          title={isFavorite ? t.removeFromFavorites : t.addToFavorites}
          aria-label={isFavorite ? t.removeFromFavorites : t.addToFavorites}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Optional Reading Progress Bar on Image Bottom */}
        {readingProgressPercent !== undefined && readingProgressPercent > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
              style={{ width: `${Math.min(100, readingProgressPercent)}%` }}
            />
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="space-y-1.5">
          {/* Metadata line (Anti-slop zero-pill text) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="truncate max-w-[140px] text-purple-400 font-medium">{book.genre}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{book.pageCount} {t.pages}</span>
          </div>

          {/* Book Title */}
          <h3 
            onClick={() => onViewBook(book)}
            className={`font-serif font-bold text-base leading-snug line-clamp-1 cursor-pointer transition-colors ${
              isDark ? 'text-white hover:text-purple-300' : 'text-slate-900 hover:text-purple-700'
            }`}
          >
            {book.title}
          </h3>

          {/* Author Name */}
          <p className="text-xs text-slate-400 line-clamp-1">
            {book.author}
          </p>

          {/* Authentic Star Rating */}
          {book.rating > 0 && (
            <div className="flex items-center gap-1 pt-1 text-xs text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold tabular-nums text-slate-200">{book.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[11px] tabular-nums">({book.ratingCount})</span>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 mt-3 border-t border-purple-900/15 flex items-center gap-2">
          <button
            onClick={() => onViewBook(book)}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-medium transition-colors text-center cursor-pointer border ${
              isDark
                ? 'border-purple-900/30 bg-purple-950/20 hover:bg-purple-900/40 text-purple-200'
                : 'border-slate-200 bg-slate-50 hover:bg-purple-50 text-purple-900'
            }`}
          >
            {t.viewBook}
          </button>

          <button
            onClick={() => onReadBook(book)}
            className="py-2 px-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-sm transition-all cursor-pointer flex items-center justify-center shrink-0"
            title={t.readBook}
          >
            <BookOpen className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
