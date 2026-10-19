import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Type,
  Palette,
  Heart,
  Bookmark,
  Share2,
  CheckCircle,
  FileText,
  RotateCcw
} from 'lucide-react';
import { Book, Language, ThemeMode, ReadingProgress } from '../types';
import { translations } from '../data/translations';
import { storage } from '../lib/storage';

interface BookReaderProps {
  book: Book;
  onBackToLibrary: () => void;
  language: Language;
  theme: ThemeMode;
  isFavorite: boolean;
  onToggleFavorite: (bookId: string) => void;
}

export const BookReader: React.FC<BookReaderProps> = ({
  book,
  onBackToLibrary,
  language,
  theme,
  isFavorite,
  onToggleFavorite,
}) => {
  const t = translations[language];

  // Load existing progress if any
  const existingProgress = storage.getProgress(book.id);
  const totalPages = book.pageCount || (book.pages ? book.pages.length : 10);
  
  const [currentPage, setCurrentPage] = useState<number>(
    existingProgress?.currentPage && existingProgress.currentPage <= totalPages
      ? existingProgress.currentPage
      : 1
  );

  const [inputPage, setInputPage] = useState<string>(String(currentPage));
  const [zoomLevel, setZoomLevel] = useState<number>(100); // 75, 100, 125, 150
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [readerTheme, setReaderTheme] = useState<'dark' | 'sepia' | 'light' | 'night'>(
    theme === 'dark' ? 'dark' : 'light'
  );
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans' | 'mono'>('serif');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showSavedToast, setShowSavedToast] = useState<boolean>(false);
  const [mode, setMode] = useState<'text' | 'pdf'>('text');

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Sync input page with currentPage
  useEffect(() => {
    setInputPage(String(currentPage));
  }, [currentPage]);

  // Save reading progress automatically whenever currentPage changes
  useEffect(() => {
    const progressPercent = Math.min(100, Math.round((currentPage / totalPages) * 100));
    const progress: ReadingProgress = {
      bookId: book.id,
      currentPage,
      totalPages,
      progressPercent,
      lastReadAt: new Date().toISOString(),
      completed: currentPage === totalPages,
    };
    storage.saveProgress(progress);

    // Show temporary feedback toast
    setShowSavedToast(true);
    const timer = setTimeout(() => setShowSavedToast(false), 1500);
    return () => clearTimeout(timer);
  }, [book.id, currentPage, totalPages]);

  // Handle Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevPage();
      } else if (e.key === 'Escape' && !document.fullscreenElement) {
        onBackToLibrary();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(inputPage, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setInputPage(String(currentPage));
    }
  };

  // Get current page content from book data or realistic generated literary pagination
  const currentPageData = book.pages?.find((p) => p.pageNumber === currentPage);

  // Fallback content generator if page content array is shorter than total pages
  const displayContent = currentPageData?.content || `[${book.title} — ${currentPage}-sahifa]\n\nUshbu asar mutolaasi davom etmoqda. Abdulla Qodiriy, Alisher Navoiy va o‘zbek mumtoz adabiyoti xazinasidagi eng buyuk so‘z san'ati namunalari inson ma'naviyatini boyitadi.\n\nHar bir sahifani sinchiklab o‘qish — ajdodlar hikmati bilan tillashishdir. Muallifning badiiy tili, qahramonlarning ichki kechinmalari va falsafiy xulosalari ushbu bobda yanada teran ochib beriladi.\n\nKeyingi sahifaga o‘tish uchun o‘ng tomondagi tugmani bosing yoki klaviaturadagi strelkalardan foydalaning.`;
  const currentChapterTitle = currentPageData?.chapterTitle || book.chapters?.[0]?.title || `Bob ${Math.ceil(currentPage / 3)}`;

  // Styling based on reader theme
  let themeStyles = {
    bg: 'bg-zinc-950',
    paper: 'bg-zinc-900 border-zinc-800 text-zinc-100',
    text: 'text-zinc-200',
    muted: 'text-zinc-400',
    bar: 'bg-zinc-950/90 border-zinc-800',
  };

  if (readerTheme === 'sepia') {
    themeStyles = {
      bg: 'bg-[#1e1914]',
      paper: 'bg-[#f4ecd8] border-[#e2d5b8] text-[#2c221e]',
      text: 'text-[#2c221e]',
      muted: 'text-[#6b584e]',
      bar: 'bg-[#2b221b]/95 border-[#45362b]',
    };
  } else if (readerTheme === 'light') {
    themeStyles = {
      bg: 'bg-slate-100',
      paper: 'bg-white border-slate-200 text-slate-800 shadow-xl',
      text: 'text-slate-900',
      muted: 'text-slate-500',
      bar: 'bg-white/95 border-slate-200 text-slate-800',
    };
  } else if (readerTheme === 'night') {
    themeStyles = {
      bg: 'bg-black',
      paper: 'bg-[#09090b] border-zinc-900 text-zinc-300',
      text: 'text-zinc-300',
      muted: 'text-zinc-500',
      bar: 'bg-black border-zinc-900',
    };
  }

  // Font size classes
  const fontSizeClass = {
    sm: 'text-sm sm:text-base leading-relaxed',
    base: 'text-base sm:text-lg leading-loose',
    lg: 'text-lg sm:text-xl leading-loose',
    xl: 'text-xl sm:text-2xl leading-loose',
  }[fontSize];

  // Font family classes
  const fontFamilyClass = {
    serif: 'font-serif',
    sans: 'font-sans',
    mono: 'font-mono',
  }[fontFamily];

  const progressPercent = Math.round((currentPage / totalPages) * 100);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex flex-col transition-colors duration-300 ${themeStyles.bg}`}
    >
      {/* Top Navigation & Toolbar */}
      <header className={`h-16 px-4 sm:px-6 flex items-center justify-between border-b backdrop-blur-md z-30 ${themeStyles.bar}`}>
        {/* Left: Back & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToLibrary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-purple-600/20 text-purple-400 transition-colors cursor-pointer border border-purple-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t.backToLibrary}</span>
          </button>

          <div className="border-l border-zinc-700/40 pl-3 max-w-[200px] sm:max-w-xs md:max-w-md">
            <h2 className="text-sm font-bold font-serif truncate text-white">
              {book.title}
            </h2>
            <p className="text-[11px] text-slate-400 truncate">
              {book.author} · {currentChapterTitle}
            </p>
          </div>
        </div>

        {/* Center: Mode switcher (Text vs PDF view) */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-medium">
          <button
            onClick={() => setMode('text')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              mode === 'text' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.textMode}
          </button>
          <button
            onClick={() => setMode('pdf')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              mode === 'pdf' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.pdfMode}
          </button>
        </div>

        {/* Right: Controls (Zoom, Settings, Fullscreen, Favorite) */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Zoom In/Out */}
          <div className="hidden sm:flex items-center gap-1 border border-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
              className="p-1.5 rounded hover:bg-zinc-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Kichraytirish"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono px-1 text-slate-400">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
              className="p-1.5 rounded hover:bg-zinc-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Kattalashtirish"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Reader Display Settings (Font, Theme) */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-xl transition-colors cursor-pointer border ${
              showSettings ? 'bg-purple-600 text-white border-purple-500' : 'border-zinc-800 hover:bg-zinc-800/60 text-slate-300'
            }`}
            title="O‘qish sozlamalari"
          >
            <Palette className="w-4 h-4" />
          </button>

          {/* Favorite Toggle */}
          <button
            onClick={() => onToggleFavorite(book.id)}
            className={`p-2 rounded-xl transition-colors cursor-pointer border ${
              isFavorite
                ? 'border-rose-500/40 bg-rose-500/20 text-rose-400'
                : 'border-zinc-800 hover:bg-zinc-800/60 text-slate-300'
            }`}
            title={isFavorite ? t.removeFromFavorites : t.addToFavorites}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl border border-zinc-800 hover:bg-zinc-800/60 text-slate-300 transition-colors cursor-pointer"
            title={isFullscreen ? t.exitFullscreen : t.fullscreen}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Reader Settings Drawer/Popover */}
      {showSettings && (
        <div className="absolute top-16 right-4 sm:right-6 w-80 p-4 rounded-2xl bg-zinc-950/95 border border-purple-900/40 shadow-2xl z-40 text-xs space-y-4 animate-fade-in backdrop-blur-md">
          {/* Theme Palette */}
          <div>
            <span className="font-semibold text-slate-300 block mb-2">{t.readerTheme}</span>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setReaderTheme('dark')}
                className={`py-2 px-1 rounded-lg border text-center font-medium cursor-pointer ${
                  readerTheme === 'dark' ? 'border-purple-500 bg-zinc-900 text-white ring-1 ring-purple-500' : 'border-zinc-800 bg-zinc-900 text-zinc-400'
                }`}
              >
                Tungi
              </button>
              <button
                onClick={() => setReaderTheme('sepia')}
                className={`py-2 px-1 rounded-lg border text-center font-medium cursor-pointer ${
                  readerTheme === 'sepia' ? 'border-amber-600 bg-[#f4ecd8] text-[#2c221e] ring-1 ring-amber-600' : 'border-[#45362b] bg-[#2b221b] text-amber-200'
                }`}
              >
                Sepiya
              </button>
              <button
                onClick={() => setReaderTheme('light')}
                className={`py-2 px-1 rounded-lg border text-center font-medium cursor-pointer ${
                  readerTheme === 'light' ? 'border-slate-400 bg-white text-slate-900 ring-1 ring-slate-400' : 'border-slate-300 bg-slate-200 text-slate-800'
                }`}
              >
                Oq
              </button>
              <button
                onClick={() => setReaderTheme('night')}
                className={`py-2 px-1 rounded-lg border text-center font-medium cursor-pointer ${
                  readerTheme === 'night' ? 'border-purple-500 bg-black text-white ring-1 ring-purple-500' : 'border-zinc-900 bg-black text-zinc-500'
                }`}
              >
                Qora
              </button>
            </div>
          </div>

          {/* Font Size */}
          <div>
            <span className="font-semibold text-slate-300 block mb-2">{t.fontSize}</span>
            <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
              {(['sm', 'base', 'lg', 'xl'] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setFontSize(sz)}
                  className={`py-1.5 rounded-lg text-center font-medium transition-colors cursor-pointer ${
                    fontSize === sz ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {sz === 'sm' ? 'A' : sz === 'base' ? 'A+' : sz === 'lg' ? 'A++' : 'A+++'}
                </button>
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div>
            <span className="font-semibold text-slate-300 block mb-2">{t.fontFamily}</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFontFamily('serif')}
                className={`py-2 rounded-lg border text-center font-serif cursor-pointer ${
                  fontFamily === 'serif' ? 'border-purple-500 bg-purple-950/40 text-purple-200' : 'border-zinc-800 text-slate-400'
                }`}
              >
                Lora Serif
              </button>
              <button
                onClick={() => setFontFamily('sans')}
                className={`py-2 rounded-lg border text-center font-sans cursor-pointer ${
                  fontFamily === 'sans' ? 'border-purple-500 bg-purple-950/40 text-purple-200' : 'border-zinc-800 text-slate-400'
                }`}
              >
                Sans UI
              </button>
              <button
                onClick={() => setFontFamily('mono')}
                className={`py-2 rounded-lg border text-center font-mono cursor-pointer ${
                  fontFamily === 'mono' ? 'border-purple-500 bg-purple-950/40 text-purple-200' : 'border-zinc-800 text-slate-400'
                }`}
              >
                Monospace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Reading Viewport Area */}
      <main
        ref={contentRef}
        className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 flex justify-center items-start"
      >
        <div
          className={`w-full max-w-3xl transition-transform duration-200 rounded-3xl p-6 sm:p-12 md:p-16 border shadow-2xl relative ${themeStyles.paper}`}
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {/* Header of Page */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-black/10 dark:border-white/10 text-xs opacity-75">
            <span className="font-serif italic tracking-wide">{book.title}</span>
            <span className="font-mono">{currentChapterTitle}</span>
          </div>

          {/* Book Content Mode (Fluid Text or PDF representation) */}
          {mode === 'text' ? (
            <div className={`space-y-6 ${fontSizeClass} ${fontFamilyClass}`}>
              <div className="font-serif font-bold text-xl sm:text-2xl text-purple-400 mb-6 tracking-tight">
                {currentChapterTitle}
              </div>

              {displayContent.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="indent-6 sm:indent-8 text-justify">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            // PDF Authentic Page Mode Viewport
            <div className="flex flex-col items-center justify-center p-4 sm:p-6 border border-purple-500/30 rounded-2xl bg-black/10 min-h-[420px]">
              {book.pdfUrl ? (
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>PDF hujjat manbasi: {book.title}</span>
                    <a
                      href={book.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:underline"
                    >
                      Alohida oynada ochish
                    </a>
                  </div>
                  <iframe
                    src={`${book.pdfUrl}#page=${currentPage}`}
                    title={book.title}
                    className="w-full h-[600px] rounded-xl border border-zinc-800 bg-white"
                  />
                </div>
              ) : (
                <div className="py-12 px-4 text-center max-w-md space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-white">
                    PDF fayl mavjud emas
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t.pdfNotAvailable}
                  </p>
                  <button
                    onClick={() => setMode('text')}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-purple-600 text-white hover:bg-purple-500 shadow-md shadow-purple-600/30 transition-all cursor-pointer"
                  >
                    Matnli mutolaaga o‘tish
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Footer of Page: Chapter end or bottom page number */}
          <div className="mt-12 pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs opacity-60">
            <span>ONLY KITOB O‘QISH · Raqamli Kutubxona</span>
            <span className="font-mono font-bold">— {currentPage} —</span>
          </div>
        </div>
      </main>

      {/* Floating Left & Right Navigation Arrows for Touch / Desktop */}
      <button
        onClick={goToPrevPage}
        disabled={currentPage <= 1}
        className={`fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full backdrop-blur-md shadow-2xl transition-all cursor-pointer z-30 ${
          currentPage <= 1
            ? 'opacity-20 pointer-events-none'
            : 'bg-black/60 hover:bg-purple-600 text-white border border-white/15 hover:scale-110 active:scale-95'
        }`}
        aria-label="Oldingi sahifa"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNextPage}
        disabled={currentPage >= totalPages}
        className={`fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full backdrop-blur-md shadow-2xl transition-all cursor-pointer z-30 ${
          currentPage >= totalPages
            ? 'opacity-20 pointer-events-none'
            : 'bg-black/60 hover:bg-purple-600 text-white border border-white/15 hover:scale-110 active:scale-95'
        }`}
        aria-label="Keyingi sahifa"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Control Bar */}
      <footer className={`h-16 px-4 sm:px-6 flex items-center justify-between border-t backdrop-blur-md z-30 ${themeStyles.bar}`}>
        {/* Previous page button */}
        <button
          onClick={goToPrevPage}
          disabled={currentPage <= 1}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
            currentPage <= 1
              ? 'border-transparent text-zinc-600 cursor-not-allowed'
              : 'border-zinc-800 hover:bg-zinc-800 text-zinc-200'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Oldingi</span>
        </button>

        {/* Center: Page Counter, Jump Input, and Progress Bar */}
        <div className="flex flex-col items-center gap-1">
          <form onSubmit={handlePageJumpSubmit} className="flex items-center gap-2">
            <span className="text-xs text-slate-400">{t.page}</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              className="w-12 py-1 px-1.5 text-center text-xs font-mono font-bold rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-purple-500"
            />
            <span className="text-xs text-slate-400">
              {t.of} {totalPages}
            </span>
            <button
              type="submit"
              className="px-2 py-1 text-[11px] font-semibold rounded-md bg-purple-600 text-white hover:bg-purple-500 cursor-pointer hidden sm:inline"
            >
              {t.jumpToPage}
            </button>
          </form>

          {/* Progress % Bar */}
          <div className="flex items-center gap-2">
            <div className="w-32 sm:w-48 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] font-mono font-semibold text-purple-400">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Next page button */}
        <button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
            currentPage >= totalPages
              ? 'border-transparent text-zinc-600 cursor-not-allowed'
              : 'border-zinc-800 hover:bg-zinc-800 text-zinc-200'
          }`}
        >
          <span className="hidden sm:inline">Keyingi</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

      {/* Auto-saved notification toast */}
      {showSavedToast && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-purple-950/90 border border-purple-500/40 text-purple-200 text-xs flex items-center gap-2 shadow-xl backdrop-blur-md animate-fade-in pointer-events-none z-50">
          <Bookmark className="w-3.5 h-3.5 text-purple-400" />
          <span>{currentPage}-sahifa saqlandi ({progressPercent}%)</span>
        </div>
      )}
    </div>
  );
};
