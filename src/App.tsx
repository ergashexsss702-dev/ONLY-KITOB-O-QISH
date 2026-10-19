import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  X, 
  Filter, 
  RotateCcw, 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  Star,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  Book, 
  Language, 
  ThemeMode, 
  UserProfile, 
  ReadingProgress, 
  PurchaseRecord, 
  UserPreferences,
  AgeRating 
} from './types';
import { translations } from './data/translations';
import { initialCategories } from './data/initialBooks';
import { storage } from './lib/storage';
import { BackgroundLayer } from './components/BackgroundLayer';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookCard } from './components/BookCard';
import { BookModal } from './components/BookModal';
import { BookReader } from './components/BookReader';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { PurchaseModal } from './components/PurchaseModal';
import { BackgroundSettingsModal } from './components/BackgroundSettingsModal';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';

export default function App() {
  // Global & User State
  const [preferences, setPreferences] = useState<UserPreferences>(() => storage.getPreferences());
  const [user, setUser] = useState<UserProfile | null>(() => storage.getProfile());
  const [books, setBooks] = useState<Book[]>(() => storage.getBooks());
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => storage.getFavorites());
  const [readingHistory, setReadingHistory] = useState<Record<string, ReadingProgress>>(() => storage.getAllProgress());
  const [purchases, setPurchases] = useState<PurchaseRecord[]>(() => storage.getPurchases());

  // Navigation & Modals
  const [currentTab, setCurrentTab] = useState<string>('home'); // 'home' | 'library' | 'genres' | 'favorites' | 'history'
  const [activeBookForModal, setActiveBookForModal] = useState<Book | null>(null);
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [purchasingBook, setPurchasingBook] = useState<Book | null>(null);

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);

  // Search & Filter State
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAgeRating, setSelectedAgeRating] = useState<string>('all');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<'all' | 'free' | 'paid'>('all');

  const language = preferences.language;
  const theme = preferences.theme;
  const t = translations[language];
  const isDark = theme === 'dark';

  // Apply dark/light theme class to document body
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-black text-slate-100 antialiased selection:bg-purple-600 selection:text-white';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-slate-50 text-slate-900 antialiased selection:bg-purple-600 selection:text-white';
    }
  }, [theme]);

  // Preference Handlers
  const handleUpdatePreferences = (newPrefs: Partial<UserPreferences>) => {
    const updated = storage.savePreferences(newPrefs);
    setPreferences(updated);
  };

  const handleLanguageChange = (lang: Language) => {
    handleUpdatePreferences({ language: lang });
  };

  const handleThemeToggle = () => {
    handleUpdatePreferences({ theme: theme === 'dark' ? 'light' : 'dark' });
  };

  // Auth Handlers
  const handleAuthSuccess = (profile: UserProfile) => {
    storage.setProfile(profile);
    setUser(profile);
  };

  const handleLogout = () => {
    storage.clearProfile();
    setUser(null);
    setProfileModalOpen(false);
  };

  // Book Favorite Toggle
  const handleToggleFavorite = (bookId: string) => {
    const updated = storage.toggleFavorite(bookId);
    setFavoriteIds(updated);
  };

  // Start Reading Flow (checks age recommendation or purchase requirement)
  const handleStartReading = (book: Book) => {
    // If book is paid and not purchased, open purchase modal
    const isPurchased = purchases.some((p) => p.bookId === book.id && p.status === 'completed');
    if (!book.isFree && !isPurchased) {
      if (!user) {
        setAuthModalOpen(true);
        return;
      }
      setPurchasingBook(book);
      return;
    }

    setReadingBook(book);
  };

  const handlePurchaseSuccess = (record: PurchaseRecord) => {
    storage.addPurchase(record);
    setPurchases(storage.getPurchases());
    // Auto start reading purchased book
    if (purchasingBook) {
      setReadingBook(purchasingBook);
      setPurchasingBook(null);
    }
  };

  // Admin Book mutations
  const handleAddOrUpdateBook = (book: Book) => {
    storage.addOrUpdateBook(book);
    setBooks(storage.getBooks());
  };

  const handleDeleteBook = (bookId: string) => {
    storage.deleteBook(bookId);
    setBooks(storage.getBooks());
  };

  // Featured book for Hero spotlight
  const featuredBook = useMemo(() => {
    return books.find((b) => b.id === 'otkan-kunlar') || books[0];
  }, [books]);

  // Filtering Logic
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Visibility
      if (!book.isActive) return false;

      // Search Query (title, author, genre)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = book.title.toLowerCase().includes(query);
        const matchAuthor = book.author.toLowerCase().includes(query);
        const matchGenre = book.genre.toLowerCase().includes(query);
        if (!matchTitle && !matchAuthor && !matchGenre) return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'bepul' && !book.isFree) return false;
        if (selectedCategory !== 'bepul' && book.categoryId !== selectedCategory) return false;
      }

      // Age Rating filter
      if (selectedAgeRating !== 'all') {
        if (book.ageRating !== selectedAgeRating) return false;
      }

      // Price filter
      if (selectedPriceFilter === 'free' && !book.isFree) return false;
      if (selectedPriceFilter === 'paid' && book.isFree) return false;

      // Tab specific views
      if (currentTab === 'favorites' && !favoriteIds.includes(book.id)) return false;
      if (currentTab === 'history' && !readingHistory[book.id]) return false;

      return true;
    });
  }, [
    books,
    searchQuery,
    selectedCategory,
    selectedAgeRating,
    selectedPriceFilter,
    currentTab,
    favoriteIds,
    readingHistory,
  ]);

  // Curated collections for the home catalog sections
  const recommendedBooks = useMemo(() => {
    // If user has set an age, recommend books matching or below user's age
    return books.filter((b) => b.isActive).slice(0, 6);
  }, [books]);

  const uzbekClassics = useMemo(() => {
    return books.filter((b) => b.isActive && b.categoryId === 'ozbek-adabiyoti');
  }, [books]);

  const worldClassics = useMemo(() => {
    return books.filter((b) => b.isActive && b.categoryId === 'jahon-adabiyoti');
  }, [books]);

  const poetryBooks = useMemo(() => {
    return books.filter((b) => b.isActive && b.categoryId === 'sheriyat');
  }, [books]);

  const freeBooks = useMemo(() => {
    return books.filter((b) => b.isActive && b.isFree);
  }, [books]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedAgeRating('all');
    setSelectedPriceFilter('all');
  };

  // If reader is open, display full-screen BookReader exclusively!
  if (readingBook) {
    return (
      <BookReader
        book={readingBook}
        onBackToLibrary={() => {
          setReadingBook(null);
          // Refresh reading history from storage
          setReadingHistory(storage.getAllProgress());
        }}
        language={language}
        theme={theme}
        isFavorite={favoriteIds.includes(readingBook.id)}
        onToggleFavorite={handleToggleFavorite}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-purple-600 selection:text-white">
      {/* Dynamic Customizable Background */}
      <BackgroundLayer preferences={preferences} />

      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'library' || tab === 'genres') {
            window.scrollTo({ top: 500, behavior: 'smooth' });
          }
        }}
        language={language}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenProfile={() => {
          if (user) {
            setProfileModalOpen(true);
          } else {
            setAuthModalOpen(true);
          }
        }}
        onOpenSettings={() => setSettingsModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onToggleSearch={() => setSearchOpen(!searchOpen)}
        favoritesCount={favoriteIds.length}
      />

      {/* Hero Section (shown on Home tab) */}
      {currentTab === 'home' && !searchQuery && (
        <Hero
          language={language}
          theme={theme}
          onExploreBooks={() => {
            const libraryEl = document.getElementById('catalog-section');
            libraryEl?.scrollIntoView({ behavior: 'smooth' });
          }}
          onStartReading={() => {
            if (featuredBook) handleStartReading(featuredBook);
          }}
          featuredBook={featuredBook}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Search & Filter Toolbar */}
        <div id="catalog-section" className="space-y-4 mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-10 py-3 rounded-2xl text-sm border focus:outline-none transition-all ${
                  isDark
                    ? 'bg-zinc-900/80 border-purple-900/30 text-white focus:border-purple-500 shadow-inner'
                    : 'bg-white border-slate-200 text-slate-900 focus:border-purple-600 shadow-sm'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filter Selectors (Age & Price) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {/* Age Rating Filter */}
              <select
                value={selectedAgeRating}
                onChange={(e) => setSelectedAgeRating(e.target.value)}
                className={`py-2.5 px-3 rounded-xl text-xs font-medium border focus:outline-none cursor-pointer ${
                  isDark 
                    ? 'bg-zinc-900 border-purple-900/30 text-slate-300' 
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <option value="all">{t.filterByAge}: Barchasi</option>
                <option value="Barchaga">Barchaga</option>
                <option value="10+">10+</option>
                <option value="12+">12+</option>
                <option value="16+">16+</option>
                <option value="18+">18+</option>
              </select>

              {/* Price Filter */}
              <select
                value={selectedPriceFilter}
                onChange={(e) => setSelectedPriceFilter(e.target.value as any)}
                className={`py-2.5 px-3 rounded-xl text-xs font-medium border focus:outline-none cursor-pointer ${
                  isDark 
                    ? 'bg-zinc-900 border-purple-900/30 text-slate-300' 
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <option value="all">{t.allPrices}</option>
                <option value="free">{t.onlyFree}</option>
                <option value="paid">{t.onlyPaid}</option>
              </select>

              {/* Clear Filter Button if active */}
              {(searchQuery || selectedCategory !== 'all' || selectedAgeRating !== 'all' || selectedPriceFilter !== 'all') && (
                <button
                  onClick={clearAllFilters}
                  className="p-2.5 rounded-xl border border-purple-900/40 text-purple-400 hover:bg-purple-950/40 transition-colors cursor-pointer text-xs flex items-center gap-1"
                  title={t.clearFilters}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.clearFilters}</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Genre & Category Segmented Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {initialCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const catName = language === 'ru' ? cat.nameRu : language === 'en' ? cat.nameEn : cat.nameUz;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30'
                      : isDark
                      ? 'bg-zinc-900/60 border-purple-900/20 text-slate-300 hover:border-purple-700/50 hover:text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300'
                  }`}
                >
                  {catName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Specific Views or Search Results */}
        {currentTab === 'favorites' && (
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold font-display">{t.favoritesTab}</h2>
            <span className="text-xs text-slate-400">{filteredBooks.length} {t.foundResults}</span>
          </div>
        )}

        {currentTab === 'history' && (
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold font-display">{t.readingHistoryTab}</h2>
            <span className="text-xs text-slate-400">{filteredBooks.length} {t.foundResults}</span>
          </div>
        )}

        {/* Search / Filter Active Results Grid */}
        {(searchQuery || selectedCategory !== 'all' || selectedAgeRating !== 'all' || selectedPriceFilter !== 'all' || currentTab !== 'home') ? (
          <div>
            <div className="mb-4 text-xs text-slate-400 font-medium">
              {filteredBooks.length} {t.foundResults}
            </div>

            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    language={language}
                    theme={theme}
                    isFavorite={favoriteIds.includes(book.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onViewBook={(b) => setActiveBookForModal(b)}
                    onReadBook={(b) => handleStartReading(b)}
                    readingProgressPercent={readingHistory[book.id]?.progressPercent}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-purple-950/40 border border-purple-900/40 flex items-center justify-center mx-auto text-purple-400">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold font-display">{t.noBooksFound}</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">{t.noBooksFoundDesc}</p>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 text-white hover:bg-purple-500 cursor-pointer shadow-md"
                >
                  {t.clearFilters}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Structured Editorial Collections for Home Page */
          <div className="space-y-16">
            {/* 1. Siz uchun tavsiyalar */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display">{t.recommended}</h2>
                  <p className="text-xs text-slate-400">Eng ko‘p o‘qilgan va yuqori baholangan asarlar</p>
                </div>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Barchasi</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                {recommendedBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    language={language}
                    theme={theme}
                    isFavorite={favoriteIds.includes(book.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onViewBook={(b) => setActiveBookForModal(b)}
                    onReadBook={(b) => handleStartReading(b)}
                    readingProgressPercent={readingHistory[book.id]?.progressPercent}
                  />
                ))}
              </div>
            </section>

            {/* 2. O‘zbek adabiyoti durdonalari */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display">{t.uzbekLiterature}</h2>
                  <p className="text-xs text-slate-400">Navoiy, Qodiriy, Bobur va Cho‘lpon merosi</p>
                </div>
                <button
                  onClick={() => setSelectedCategory('ozbek-adabiyoti')}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Barchasi</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                {uzbekClassics.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    language={language}
                    theme={theme}
                    isFavorite={favoriteIds.includes(book.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onViewBook={(b) => setActiveBookForModal(b)}
                    onReadBook={(b) => handleStartReading(b)}
                    readingProgressPercent={readingHistory[book.id]?.progressPercent}
                  />
                ))}
              </div>
            </section>

            {/* 3. Jahon adabiyoti */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display">{t.worldLiterature}</h2>
                  <p className="text-xs text-slate-400">Jahon klassikasi va sarguzasht durdonalari</p>
                </div>
                <button
                  onClick={() => setSelectedCategory('jahon-adabiyoti')}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Barchasi</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                {worldClassics.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    language={language}
                    theme={theme}
                    isFavorite={favoriteIds.includes(book.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onViewBook={(b) => setActiveBookForModal(b)}
                    onReadBook={(b) => handleStartReading(b)}
                    readingProgressPercent={readingHistory[book.id]?.progressPercent}
                  />
                ))}
              </div>
            </section>

            {/* 4. She‘riyat va Dostonlar */}
            {poetryBooks.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-display">{t.poetry}</h2>
                    <p className="text-xs text-slate-400">O‘zbek she‘riyatining betakror ohanglari</p>
                  </div>
                  <button
                    onClick={() => setSelectedCategory('sheriyat')}
                    className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Barchasi</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                  {poetryBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      language={language}
                      theme={theme}
                      isFavorite={favoriteIds.includes(book.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onViewBook={(b) => setActiveBookForModal(b)}
                      onReadBook={(b) => handleStartReading(b)}
                      readingProgressPercent={readingHistory[book.id]?.progressPercent}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* 5. Bepul mutolaa qilish mumkin bo‘lgan kitoblar */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display">{t.freeBooks}</h2>
                  <p className="text-xs text-slate-400">Barcha uchun ochiq litsenziyadagi kitoblar</p>
                </div>
                <button
                  onClick={() => setSelectedPriceFilter('free')}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Barchasi</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                {freeBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    language={language}
                    theme={theme}
                    isFavorite={favoriteIds.includes(book.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onViewBook={(b) => setActiveBookForModal(b)}
                    onReadBook={(b) => handleStartReading(b)}
                    readingProgressPercent={readingHistory[book.id]?.progressPercent}
                  />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        language={language}
        theme={theme}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSettings={() => setSettingsModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Modals */}
      {/* 1. Book Details Modal */}
      {activeBookForModal && (
        <BookModal
          book={activeBookForModal}
          onClose={() => setActiveBookForModal(null)}
          language={language}
          theme={theme}
          isFavorite={favoriteIds.includes(activeBookForModal.id)}
          isPurchased={purchases.some((p) => p.bookId === activeBookForModal.id && p.status === 'completed')}
          onToggleFavorite={handleToggleFavorite}
          onStartReading={(b) => handleStartReading(b)}
          onBuyBook={(b) => {
            if (!user) {
              setAuthModalOpen(true);
            } else {
              setPurchasingBook(b);
            }
          }}
        />
      )}

      {/* 2. Authentication Modal */}
      {authModalOpen && (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
          language={language}
          theme={theme}
        />
      )}

      {/* 3. User Profile Modal */}
      {profileModalOpen && user && (
        <ProfileModal
          user={user}
          books={books}
          favoriteIds={favoriteIds}
          readingHistory={readingHistory}
          purchases={purchases}
          onClose={() => setProfileModalOpen(false)}
          onLogout={handleLogout}
          onSelectBookToRead={(b) => {
            setProfileModalOpen(false);
            handleStartReading(b);
          }}
          onViewBook={(b) => {
            setProfileModalOpen(false);
            setActiveBookForModal(b);
          }}
          language={language}
          theme={theme}
        />
      )}

      {/* 4. Book Purchase Modal */}
      {purchasingBook && user && (
        <PurchaseModal
          book={purchasingBook}
          user={user}
          onClose={() => setPurchasingBook(null)}
          onSuccess={handlePurchaseSuccess}
          language={language}
          theme={theme}
        />
      )}

      {/* 5. Custom Background & Theme Settings Modal */}
      {settingsModalOpen && (
        <BackgroundSettingsModal
          preferences={preferences}
          onUpdatePreferences={handleUpdatePreferences}
          onClose={() => setSettingsModalOpen(false)}
          language={language}
          theme={theme}
        />
      )}

      {/* 6. Admin Panel Modal */}
      {adminModalOpen && (
        <AdminModal
          books={books}
          onAddOrUpdateBook={handleAddOrUpdateBook}
          onDeleteBook={handleDeleteBook}
          onClose={() => setAdminModalOpen(false)}
          language={language}
          theme={theme}
        />
      )}
    </div>
  );
}
