import React from 'react';
import { BookOpen, Compass, Sparkles, ArrowRight } from 'lucide-react';
import { Language, ThemeMode, Book } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  language: Language;
  theme: ThemeMode;
  onExploreBooks: () => void;
  onStartReading: () => void;
  featuredBook?: Book;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  theme,
  onExploreBooks,
  onStartReading,
  featuredBook
}) => {
  const t = translations[language];
  const isDark = theme === 'dark';

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-600/15 text-purple-400 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{t.heroBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-display text-balance leading-tight">
              <span className={isDark ? 'text-white' : 'text-slate-900'}>
                {t.heroTitle}
              </span>
            </h1>

            <p className={`text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {t.heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreBooks}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>{t.heroExploreBtn}</span>
              </button>

              <button
                onClick={onStartReading}
                className={`px-6 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer border ${
                  isDark
                    ? 'border-purple-800/60 bg-purple-950/30 hover:bg-purple-900/40 text-purple-200 shadow-md shadow-purple-950/40'
                    : 'border-slate-300 bg-white hover:bg-slate-50 text-purple-800 shadow-sm'
                }`}
              >
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>{t.heroStartReadingBtn}</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
              </button>
            </div>

            {/* Quiet Editorial Proof Metadata (Anti-slop, no pills) */}
            <div className="pt-6 border-t border-purple-900/20 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-slate-400">
              <span className="text-purple-300 font-semibold">O‘zbek adabiyoti durdonalari</span>
              <span aria-hidden="true" className="text-purple-700">·</span>
              <span>Jahon klassikasi</span>
              <span aria-hidden="true" className="text-purple-700">·</span>
              <span>Yuqori aniqlikdagi PDF & matn</span>
              <span aria-hidden="true" className="text-purple-700">·</span>
              <span>100% Qulay mutolaa</span>
            </div>
          </div>

          {/* Right Column: Featured Literary Masterpiece Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            {featuredBook && (
              <div 
                onClick={onStartReading}
                className={`relative group max-w-sm w-full rounded-2xl p-4 transition-all duration-300 cursor-pointer border hover:-translate-y-1.5 shadow-2xl ${
                  isDark 
                    ? 'bg-zinc-950/80 border-purple-800/40 shadow-purple-950/50 hover:border-purple-600/60' 
                    : 'bg-white/90 border-slate-200 shadow-slate-300/60 hover:border-purple-400'
                }`}
              >
                {/* Book Cover Container with 3:4 aspect ratio */}
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-zinc-900 shadow-inner">
                  <img
                    src={featuredBook.coverUrl}
                    alt={featuredBook.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback gradient if external link fails
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                  {/* Top tags: Age & Price */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-medium">
                    <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-purple-300 border border-purple-500/30">
                      {featuredBook.ageRating}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-semibold shadow">
                      {featuredBook.isFree ? t.free : `${featuredBook.price.toLocaleString()} ${t.som}`}
                    </span>
                  </div>

                  {/* Bottom Text Over Cover */}
                  <div className="absolute bottom-3 left-3 right-3 space-y-1 text-left text-white">
                    <div className="text-[11px] uppercase tracking-wider text-purple-300 font-medium">
                      Tavsiya etilgan asar
                    </div>
                    <div className="text-xl font-bold font-serif line-clamp-1">
                      {featuredBook.title}
                    </div>
                    <div className="text-xs text-slate-300 line-clamp-1">
                      {featuredBook.author}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs pt-1">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    {featuredBook.genre} · {featuredBook.pageCount} {t.pages}
                  </span>
                  <span className="text-purple-400 font-semibold group-hover:underline flex items-center gap-1">
                    {t.readBook} →
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
