import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  Lock, 
  ShoppingBag, 
  Check, 
  BookOpen, 
  AlertCircle 
} from 'lucide-react';
import { Book, Language, ThemeMode, PurchaseRecord, AgeRating } from '../types';
import { translations } from '../data/translations';
import { storage } from '../lib/storage';

interface AdminModalProps {
  books: Book[];
  onAddOrUpdateBook: (book: Book) => void;
  onDeleteBook: (bookId: string) => void;
  onClose: () => void;
  language: Language;
  theme: ThemeMode;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  books,
  onAddOrUpdateBook,
  onDeleteBook,
  onClose,
  language,
  theme
}) => {
  const t = translations[language];
  const isDark = theme === 'dark';

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(storage.isAdminAuthenticated());
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);
  const [tab, setTab] = useState<'books' | 'add' | 'purchases'>('books');

  // Form states for adding/editing a book
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [categoryId, setCategoryId] = useState('ozbek-adabiyoti');
  const [coverUrl, setCoverUrl] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [ageRating, setAgeRating] = useState<AgeRating>('12+');
  const [pageCount, setPageCount] = useState<number>(20);
  const [description, setDescription] = useState('');
  const [contentSample, setContentSample] = useState('');
  const [licenseInfo, setLicenseInfo] = useState('Ochiq litsenziya / Jamoat mulki');
  const [formSuccess, setFormSuccess] = useState(false);

  const purchases = storage.getPurchases();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin2026' || passcode === 'admin') {
      setIsAuthenticated(true);
      storage.setAdminAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleStartEdit = (b: Book) => {
    setEditingBookId(b.id);
    setTitle(b.title);
    setAuthor(b.author);
    setGenre(b.genre);
    setCategoryId(b.categoryId);
    setCoverUrl(b.coverUrl);
    setPrice(b.price);
    setAgeRating(b.ageRating);
    setPageCount(b.pageCount);
    setDescription(b.description);
    setContentSample(b.pages?.[0]?.content || '');
    setLicenseInfo(b.licenseInfo);
    setTab('add');
  };

  const handleResetForm = () => {
    setEditingBookId(null);
    setTitle('');
    setAuthor('');
    setGenre('');
    setCategoryId('ozbek-adabiyoti');
    setCoverUrl('');
    setPrice(0);
    setAgeRating('12+');
    setPageCount(20);
    setDescription('');
    setContentSample('');
    setLicenseInfo('Ochiq litsenziya / Jamoat mulki');
  };

  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();

    const bookId = editingBookId || title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString(36);

    const bookToSave: Book = {
      id: bookId,
      title: title.trim(),
      author: author.trim(),
      categoryId,
      genre: genre.trim() || 'Mumtoz adabiyot',
      coverUrl: coverUrl.trim() || '/src/assets/images/book_cover_otkan_kunlar_1792381373922.jpg',
      description: description.trim(),
      language: 'uz',
      ageRating,
      price: Number(price) || 0,
      isFree: Number(price) === 0,
      rating: 5.0,
      ratingCount: 1,
      pageCount: Number(pageCount) || 15,
      fileType: 'reader',
      licenseInfo: licenseInfo.trim(),
      isActive: true,
      pages: [
        {
          pageNumber: 1,
          chapterTitle: '1-bob: Kirish',
          content: contentSample.trim() || `${title} asaridan namunaviy parcha. Mutolaa davomida kitobning to‘liq matnidan bahramand bo‘ling.`
        }
      ]
    };

    onAddOrUpdateBook(bookToSave);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      handleResetForm();
      setTab('books');
    }, 1000);
  };

  const handleToggleActive = (b: Book) => {
    const updated = { ...b, isActive: !b.isActive };
    onAddOrUpdateBook(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className={`relative w-full max-w-3xl rounded-3xl overflow-hidden border shadow-2xl transition-colors ${
          isDark 
            ? 'bg-zinc-950 border-purple-900/40 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-purple-900/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display">{t.adminDashboard}</h2>
              <span className="text-xs text-slate-400">Kitoblar katalogi va xaridlarni boshqarish</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-8 max-w-sm mx-auto text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-purple-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">{t.adminPasscode}</h3>
            <p className="text-xs text-slate-400">{t.adminPasscodePrompt}</p>

            {authError && (
              <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-1.5 justify-center">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{t.accessDenied}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                placeholder="Parol (standart: admin2026)"
                value={passcode}
                onChange={(e) => { setPasscode(e.target.value); setAuthError(false); }}
                className="w-full py-2.5 px-3.5 rounded-xl text-sm bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-purple-500 text-center"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors cursor-pointer"
              >
                Kirish
              </button>
            </form>
          </div>
        ) : (
          <div>
            {/* Tabs */}
            <div className="flex border-b border-purple-900/20 px-6 pt-2">
              <button
                onClick={() => setTab('books')}
                className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                  tab === 'books' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t.allBooksList} ({books.length})</span>
              </button>
              <button
                onClick={() => { handleResetForm(); setTab('add'); }}
                className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                  tab === 'add' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{editingBookId ? t.editBook : t.addNewBook}</span>
              </button>
              <button
                onClick={() => setTab('purchases')}
                className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                  tab === 'purchases' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{t.purchaseHistoryAdmin} ({purchases.length})</span>
              </button>
            </div>

            {/* Tab 1: Books List */}
            {tab === 'books' && (
              <div className="p-6 max-h-[55vh] overflow-y-auto space-y-3">
                {books.map((b) => (
                  <div
                    key={b.id}
                    className="p-3.5 rounded-2xl bg-zinc-900/50 border border-purple-900/20 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img src={b.coverUrl} alt={b.title} className="w-10 h-14 rounded-lg object-cover bg-zinc-800" />
                      <div>
                        <h4 className="text-sm font-semibold text-white">{b.title}</h4>
                        <p className="text-xs text-slate-400">{b.author} · {b.genre}</p>
                        <div className="flex items-center gap-2 mt-1 text-[11px]">
                          <span className="font-mono text-purple-400">
                            {b.isFree ? t.free : `${b.price.toLocaleString()} ${t.som}`}
                          </span>
                          <span>·</span>
                          <span className="text-slate-400">{b.ageRating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleActive(b)}
                        className={`p-2 rounded-xl text-xs transition-colors cursor-pointer border ${
                          b.isActive 
                            ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' 
                            : 'border-zinc-700 text-zinc-500 hover:bg-zinc-800'
                        }`}
                        title={b.isActive ? t.active : t.hidden}
                      >
                        {b.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleStartEdit(b)}
                        className="p-2 rounded-xl border border-purple-900/30 text-purple-300 hover:bg-purple-900/20 transition-colors cursor-pointer"
                        title={t.editBook}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteBook(b.id)}
                        className="p-2 rounded-xl border border-rose-900/30 text-rose-400 hover:bg-rose-900/20 transition-colors cursor-pointer"
                        title={t.deleteBook}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Add / Edit Book Form */}
            {tab === 'add' && (
              <form onSubmit={handleSaveBook} className="p-6 max-h-[55vh] overflow-y-auto space-y-4 text-xs">
                {formSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Kitob muvaffaqiyatli saqlandi!</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">{t.bookTitle} *</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">{t.bookAuthor} *</label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">{t.genre} *</label>
                    <input
                      type="text"
                      required
                      placeholder="Tarixiy roman, She‘riyat..."
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">{t.bookCategory}</label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="ozbek-adabiyoti">O‘zbek adabiyoti</option>
                      <option value="jahon-adabiyoti">Jahon adabiyoti</option>
                      <option value="sheriyat">She‘riyat</option>
                      <option value="sarguzasht">Sarguzasht</option>
                      <option value="fantastika">Fantastika</option>
                      <option value="bolalar">Bolalar adabiyoti</option>
                      <option value="talimiy">Ta‘limiy kitoblar</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">{t.bookPrice} ({t.som})</label>
                    <input
                      type="number"
                      min={0}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full py-2 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">{t.bookAgeRating}</label>
                    <select
                      value={ageRating}
                      onChange={(e) => setAgeRating(e.target.value as AgeRating)}
                      className="w-full py-2 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Barchaga">Barchaga</option>
                      <option value="10+">10+</option>
                      <option value="12+">12+</option>
                      <option value="16+">16+</option>
                      <option value="18+">18+</option>
                    </select>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-semibold text-slate-300">{t.bookCoverUrl}</label>
                    <input
                      type="url"
                      placeholder="https://... yoki /src/assets/images/..."
                      value={coverUrl}
                      onChange={(e) => setCoverUrl(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">{t.bookDescription} *</label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500 leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">{t.bookContent}</label>
                  <textarea
                    rows={4}
                    placeholder="1-sahifadagi matn..."
                    value={contentSample}
                    onChange={(e) => setContentSample(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500 leading-relaxed font-serif"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => { handleResetForm(); setTab('books'); }}
                    className="py-2.5 px-4 rounded-xl border border-zinc-800 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-xl font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-600/30 cursor-pointer"
                  >
                    {t.saveBook}
                  </button>
                </div>
              </form>
            )}

            {/* Tab 3: Purchases Audit Log */}
            {tab === 'purchases' && (
              <div className="p-6 max-h-[55vh] overflow-y-auto space-y-3 text-xs">
                {purchases.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    Hozircha xaridlar tarixi bo‘sh.
                  </div>
                ) : (
                  purchases.map((p) => (
                    <div key={p.id} className="p-3 rounded-xl bg-zinc-900/40 border border-purple-900/20 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{p.bookTitle}</div>
                        <div className="text-[11px] text-slate-400">
                          Foydalanuvchi: {p.userId} · To‘lov: <span className="uppercase text-purple-300 font-mono">{p.paymentMethod}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          ID: {p.transactionId} · {new Date(p.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm text-purple-400 font-mono">
                          {p.amount.toLocaleString()} {t.som}
                        </div>
                        <span className="text-[10px] text-emerald-400 font-medium">Bajarildi</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
