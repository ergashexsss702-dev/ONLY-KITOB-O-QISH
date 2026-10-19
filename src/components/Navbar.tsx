import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Moon, 
  Sun, 
  User, 
  Sliders, 
  ShieldCheck, 
  Menu, 
  X,
  Globe
} from 'lucide-react';
import { Language, ThemeMode, UserProfile } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: ThemeMode;
  onThemeToggle: () => void;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenAdmin: () => void;
  onToggleSearch: () => void;
  favoritesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  language,
  onLanguageChange,
  theme,
  onThemeToggle,
  user,
  onOpenAuth,
  onOpenProfile,
  onOpenSettings,
  onOpenAdmin,
  onToggleSearch,
  favoritesCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = translations[language];

  const navLinks = [
    { id: 'home', label: t.home },
    { id: 'library', label: t.library },
    { id: 'genres', label: t.genres },
    { id: 'favorites', label: `${t.favorites}${favoritesCount > 0 ? ` (${favoritesCount})` : ''}` },
    { id: 'history', label: t.history },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 backdrop-blur-md border-b ${
      isDark 
        ? 'bg-black/75 border-purple-900/30 text-white' 
        : 'bg-white/85 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Title */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight font-display bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-200 bg-clip-text text-transparent">
            ONLY KITOB O‘QISH
          </span>
        </div>

        {/* Zone 2: Navigation Links (single line, clean typography) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap py-1 relative cursor-pointer ${
                  isActive
                    ? isDark ? 'text-purple-400 font-semibold' : 'text-purple-700 font-semibold'
                    : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Interactive Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Search */}
          <button
            onClick={onToggleSearch}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'hover:bg-purple-950/40 text-slate-300 hover:text-white' : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
            title={t.searchButton}
            aria-label={t.searchButton}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer border ${
                isDark 
                  ? 'border-purple-900/40 hover:bg-purple-950/40 text-slate-300' 
                  : 'border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
              title="Tilni tanlash / Выбор языка / Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>{language}</span>
            </button>

            {langMenuOpen && (
              <div 
                className={`absolute right-0 mt-2 w-32 rounded-xl shadow-xl py-1 text-xs border z-50 animate-fade-in ${
                  isDark ? 'bg-zinc-950 border-purple-900/50 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                {(['uz', 'ru', 'en'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      onLanguageChange(lang);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 transition-colors flex items-center justify-between cursor-pointer ${
                      language === lang 
                        ? 'bg-purple-600 text-white font-medium' 
                        : isDark ? 'hover:bg-purple-950/50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span>{lang === 'uz' ? 'O‘zbek' : lang === 'ru' ? 'Русский' : 'English'}</span>
                    <span className="uppercase text-[10px] opacity-75">{lang}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={onThemeToggle}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'hover:bg-purple-950/40 text-amber-300' : 'hover:bg-slate-100 text-slate-700'
            }`}
            title={isDark ? t.lightMode : t.darkMode}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Background & Visual Settings */}
          <button
            onClick={onOpenSettings}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'hover:bg-purple-950/40 text-slate-300 hover:text-purple-300' : 'hover:bg-slate-100 text-slate-600 hover:text-purple-600'
            }`}
            title={t.backgroundSettings}
            aria-label={t.backgroundSettings}
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* User Profile / Login */}
          {user ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/40 hover:bg-purple-900/50 transition-colors text-xs font-medium cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-bold text-[11px]">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[85px] truncate hidden sm:inline">{user.fullName.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/25 transition-all cursor-pointer whitespace-nowrap"
            >
              {t.login}
            </button>
          )}

          {/* Admin shortcut button */}
          <button
            onClick={onOpenAdmin}
            className={`p-2 rounded-lg transition-colors cursor-pointer hidden md:flex ${
              isDark ? 'hover:bg-purple-950/40 text-slate-400 hover:text-purple-400' : 'hover:bg-slate-100 text-slate-500 hover:text-purple-700'
            }`}
            title={t.admin}
            aria-label={t.admin}
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'hover:bg-purple-950/40 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          className={`lg:hidden border-t px-4 pt-3 pb-6 space-y-2 animate-fade-in ${
            isDark ? 'bg-zinc-950/95 border-purple-900/30' : 'bg-white/95 border-slate-200'
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentTab === link.id
                  ? 'bg-purple-600 text-white'
                  : isDark ? 'text-slate-300 hover:bg-zinc-900' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-purple-900/20 flex gap-2">
            <button
              onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg text-center cursor-pointer border ${
                isDark ? 'border-purple-900/40 text-purple-300 bg-purple-950/20' : 'border-slate-300 text-purple-700 bg-purple-50'
              }`}
            >
              {t.adminDashboard}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
