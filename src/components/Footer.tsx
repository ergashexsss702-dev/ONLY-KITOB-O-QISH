import React from 'react';
import { BookOpen, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  language: Language;
  theme: ThemeMode;
  onSelectTab: (tab: string) => void;
  onOpenSettings: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  theme,
  onSelectTab,
  onOpenSettings,
  onOpenAdmin
}) => {
  const t = translations[language];
  const isDark = theme === 'dark';

  return (
    <footer className={`border-t transition-colors duration-300 mt-20 ${
      isDark 
        ? 'bg-black/90 border-purple-950/40 text-slate-400' 
        : 'bg-slate-50 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Mission Statement */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-bold text-base tracking-tight font-display text-white">
                ONLY KITOB O‘QISH
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-slate-400">
              O‘zbekiston va jahon mumtoz adabiyoti durdonalarini o‘z ichiga olgan zamonaviy elektron kutubxona. Har kuni yangi bilim va ma'naviyat sari odimlang.
            </p>
            <div className="flex items-center gap-2 text-xs text-purple-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Ochiq litsenziya va jamoat mulki asarlari</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Bo‘limlar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('home')} className="hover:text-purple-400 transition-colors cursor-pointer">
                  {t.home}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('library')} className="hover:text-purple-400 transition-colors cursor-pointer">
                  {t.library}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('genres')} className="hover:text-purple-400 transition-colors cursor-pointer">
                  {t.genres}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('favorites')} className="hover:text-purple-400 transition-colors cursor-pointer">
                  {t.favorites}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('history')} className="hover:text-purple-400 transition-colors cursor-pointer">
                  {t.history}
                </button>
              </li>
            </ul>
          </div>

          {/* Settings & Admin shortcut */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Sozlamalar
            </h4>
            <div className="space-y-2 text-xs">
              <button
                onClick={onOpenSettings}
                className="block text-left hover:text-purple-400 transition-colors cursor-pointer"
              >
                {t.backgroundSettings}
              </button>
              <button
                onClick={onOpenAdmin}
                className="block text-left text-purple-400 hover:text-purple-300 transition-colors cursor-pointer font-medium"
              >
                {t.adminDashboard}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Quiet editorial copyright */}
        <div className="mt-12 pt-8 border-t border-purple-900/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ONLY KITOB O‘QISH. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>O‘zbekiston</span>
            <span>·</span>
            <span>Lotin yozuvida</span>
            <span>·</span>
            <span>Elektron Kutubxona</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
