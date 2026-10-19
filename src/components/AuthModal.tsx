import React, { useState } from 'react';
import { X, ShieldCheck, UserCheck, AlertCircle, Phone, User, Calendar } from 'lucide-react';
import { Language, ThemeMode, UserProfile } from '../types';
import { translations } from '../data/translations';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (profile: UserProfile) => void;
  language: Language;
  theme: ThemeMode;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  onClose,
  onSuccess,
  language,
  theme
}) => {
  const t = translations[language];
  const isDark = theme === 'dark';

  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [error, setError] = useState<string | null>(null);

  // Format phone number as +998 XX XXX XX XX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Ensure it starts with +998
    if (!value.startsWith('+998')) {
      value = '+998 ';
    }

    // Extract only digits after +998
    const rawDigits = value.replace(/^\+998\s*/, '').replace(/\D/g, '').slice(0, 9);
    
    // Format into +998 XX XXX XX XX
    let formatted = '+998 ';
    if (rawDigits.length > 0) {
      formatted += rawDigits.slice(0, 2);
    }
    if (rawDigits.length > 2) {
      formatted += ' ' + rawDigits.slice(2, 5);
    }
    if (rawDigits.length > 5) {
      formatted += ' ' + rawDigits.slice(5, 7);
    }
    if (rawDigits.length > 7) {
      formatted += ' ' + rawDigits.slice(7, 9);
    }

    setPhone(formatted);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      setError(t.nameRequired);
      return;
    }

    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 4 || ageNum > 120) {
      setError(t.ageRequired);
      return;
    }

    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length !== 12) { // 998 + 9 digits = 12
      setError(t.phoneRequired);
      return;
    }

    const newProfile: UserProfile = {
      id: 'usr_' + Date.now().toString(36),
      fullName: fullName.trim(),
      age: ageNum,
      phone: phone.trim(),
      role: 'user',
      createdAt: new Date().toISOString()
    };

    onSuccess(newProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl transition-colors ${
          isDark 
            ? 'bg-zinc-950 border-purple-900/40 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors cursor-pointer ${
            isDark ? 'hover:bg-zinc-900 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
          }`}
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-purple-600/30">
            <UserCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display">
            {t.welcomeUser}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
            {t.enterDetails}
          </p>
        </div>

        {/* Error Feedback */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-400" />
              <span>{t.fullName}</span>
            </label>
            <input
              type="text"
              required
              placeholder={t.fullNamePlaceholder}
              value={fullName}
              onChange={(e) => { setFullName(e.target.value); setError(null); }}
              className={`w-full py-2.5 px-3.5 rounded-xl text-sm border focus:outline-none transition-colors ${
                isDark 
                  ? 'bg-zinc-900 border-zinc-800 text-white focus:border-purple-500' 
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-purple-600'
              }`}
            />
          </div>

          {/* Age */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>{t.age}</span>
            </label>
            <input
              type="number"
              required
              min={4}
              max={120}
              placeholder={t.agePlaceholder}
              value={age}
              onChange={(e) => { setAge(e.target.value); setError(null); }}
              className={`w-full py-2.5 px-3.5 rounded-xl text-sm border focus:outline-none transition-colors ${
                isDark 
                  ? 'bg-zinc-900 border-zinc-800 text-white focus:border-purple-500' 
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-purple-600'
              }`}
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-purple-400" />
              <span>{t.phone}</span>
            </label>
            <input
              type="tel"
              required
              placeholder="+998 90 123 45 67"
              value={phone}
              onChange={handlePhoneChange}
              className={`w-full py-2.5 px-3.5 rounded-xl text-sm font-mono border focus:outline-none transition-colors ${
                isDark 
                  ? 'bg-zinc-900 border-zinc-800 text-white focus:border-purple-500' 
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-purple-600'
              }`}
            />
            <span className="text-[11px] text-slate-400 block">
              {t.phoneHelp}
            </span>
          </div>

          {/* Minor Notice & Privacy Assurance */}
          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/30 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span>{t.minorNotice}</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
          >
            {t.saveAndContinue}
          </button>
        </form>
      </div>
    </div>
  );
};
