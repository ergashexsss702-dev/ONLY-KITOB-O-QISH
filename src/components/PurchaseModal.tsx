import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, AlertCircle, CreditCard, Lock } from 'lucide-react';
import { Book, Language, ThemeMode, PurchaseRecord, UserProfile } from '../types';
import { translations } from '../data/translations';

interface PurchaseModalProps {
  book: Book;
  user: UserProfile;
  onClose: () => void;
  onSuccess: (record: PurchaseRecord) => void;
  language: Language;
  theme: ThemeMode;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  book,
  user,
  onClose,
  onSuccess,
  language,
  theme
}) => {
  const t = translations[language];
  const isDark = theme === 'dark';

  const [paymentMethod, setPaymentMethod] = useState<'payme' | 'click' | 'uzum'>('payme');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePurchase = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const record: PurchaseRecord = {
        id: 'pur_' + Date.now().toString(36),
        userId: user.id,
        bookId: book.id,
        bookTitle: book.title,
        amount: book.price,
        paymentMethod,
        status: 'completed',
        transactionId: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
        createdAt: new Date().toISOString()
      };

      setIsProcessing(false);
      setSuccess(true);

      setTimeout(() => {
        onSuccess(record);
        onClose();
      }, 1400);
    }, 1200);
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        {!success ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto">
                <CreditCard className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold font-display">{t.purchaseTitle}</h2>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {t.purchaseDesc}
              </p>
            </div>

            {/* Book Item Summary */}
            <div className="p-3.5 rounded-2xl bg-purple-950/20 border border-purple-900/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-10 h-14 rounded-lg object-cover bg-zinc-900"
                />
                <div>
                  <h4 className="text-sm font-semibold font-serif text-white">{book.title}</h4>
                  <p className="text-xs text-slate-400">{book.author}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold text-purple-400 font-mono">
                  {book.price.toLocaleString()} {t.som}
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                {t.selectPayment}
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'payme', name: 'Payme', color: 'from-cyan-600 to-blue-600' },
                  { id: 'click', name: 'Click', color: 'from-blue-600 to-indigo-600' },
                  { id: 'uzum', name: 'Uzum Pay', color: 'from-purple-600 to-pink-600' }
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPaymentMethod(p.id as any)}
                    className={`py-3 px-2 rounded-xl text-center text-xs font-bold transition-all cursor-pointer border ${
                      paymentMethod === p.id
                        ? 'border-purple-500 bg-purple-950/40 text-white ring-1 ring-purple-500'
                        : isDark ? 'border-zinc-800 bg-zinc-900 text-slate-400 hover:text-white' : 'border-slate-300 bg-slate-100 text-slate-700'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Security Notice */}
            <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-[11px] text-slate-400 flex items-start gap-2">
              <Lock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>{t.paymentNotice}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold border border-zinc-800 text-slate-300 hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={handlePurchase}
                disabled={isProcessing}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span className="animate-pulse">Tasdiqlanmoqda...</span>
                ) : (
                  <span>{t.confirmPurchase}</span>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              {t.purchaseSuccess}
            </h3>
            <p className="text-xs text-slate-400">
              «{book.title}» kitobiga to‘liq kirish ruxsati berildi. Maroqli mutolaa tilaymiz!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
