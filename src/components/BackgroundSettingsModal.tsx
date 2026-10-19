import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Sparkles, 
  RotateCcw, 
  Check, 
  Image as ImageIcon, 
  AlertCircle,
  Eye
} from 'lucide-react';
import { BackgroundPreset, Language, ThemeMode, UserPreferences } from '../types';
import { translations } from '../data/translations';

interface BackgroundSettingsModalProps {
  preferences: UserPreferences;
  onUpdatePreferences: (prefs: Partial<UserPreferences>) => void;
  onClose: () => void;
  language: Language;
  theme: ThemeMode;
}

export const BackgroundSettingsModal: React.FC<BackgroundSettingsModalProps> = ({
  preferences,
  onUpdatePreferences,
  onClose,
  language,
  theme
}) => {
  const t = translations[language];
  const isDark = theme === 'dark';

  const [currentPreset, setCurrentPreset] = useState<BackgroundPreset>(preferences.backgroundPreset);
  const [customBgUrl, setCustomBgUrl] = useState<string | undefined>(preferences.customBgUrl);
  const [dimness, setDimness] = useState<number>(preferences.bgDimness);
  const [stars, setStars] = useState<boolean>(preferences.starsAnimation);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const presets: { id: BackgroundPreset; label: string; preview: string }[] = [
    { id: 'default', label: 'Grand Library', preview: '/src/assets/images/hero_library_banner_1792381373509.jpg' },
    { id: 'stars', label: 'Yulduzli kecha', preview: 'radial-gradient(circle, #2e1065 0%, #09090b 100%)' },
    { id: 'aurora', label: 'Binafsha nur', preview: 'radial-gradient(circle, #581c87 0%, #1e1b4b 50%, #030712 100%)' },
    { id: 'obsidian', label: 'Obsidian Qora', preview: '#09090b' },
    { id: 'parchment', label: 'Klassik qog‘oz', preview: '#1c1917' }
  ];

  // Handle custom image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type: JPG, PNG, WebP
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError(t.invalidFileFormat);
      return;
    }

    // Validate size: max 5MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError(t.fileTooLarge);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCustomBgUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onUpdatePreferences({
      backgroundPreset: currentPreset,
      customBgUrl,
      bgDimness: dimness,
      starsAnimation: stars
    });
    onClose();
  };

  const handleReset = () => {
    setCurrentPreset('default');
    setCustomBgUrl(undefined);
    setDimness(40);
    setStars(true);
    onUpdatePreferences({
      backgroundPreset: 'default',
      customBgUrl: undefined,
      bgDimness: 40,
      starsAnimation: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl transition-colors ${
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

        <div className="space-y-6">
          <div className="text-left space-y-1">
            <h2 className="text-xl font-bold font-display">{t.backgroundSettings}</h2>
            <p className="text-xs text-slate-400">
              Sayt atmosferasini o‘zingizga moslashtiring va saqlang.
            </p>
          </div>

          {/* Preset Theme Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              {t.presetThemes}
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {presets.map((preset) => {
                const isSelected = !customBgUrl && currentPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setCurrentPreset(preset.id);
                      setCustomBgUrl(undefined);
                    }}
                    className={`relative rounded-xl p-2 h-20 overflow-hidden border flex flex-col justify-end text-left transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-purple-500 ring-2 ring-purple-500/60' 
                        : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div 
                      className="absolute inset-0 -z-10"
                      style={
                        preset.preview.startsWith('/') || preset.preview.startsWith('http')
                          ? { backgroundImage: `url(${preset.preview})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                          : { background: preset.preview }
                      }
                    />
                    <div className="absolute inset-0 bg-black/40 -z-10" />
                    <span className="text-[11px] font-semibold text-white drop-shadow">
                      {preset.label}
                    </span>
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Upload Section */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              {t.uploadCustomBg}
            </label>

            {uploadError && (
              <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <label className="flex-1 border-2 border-dashed border-purple-900/40 hover:border-purple-500 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-purple-950/15">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Upload className="w-6 h-6 text-purple-400 mx-auto mb-1.5" />
                <span className="text-xs font-semibold text-purple-300 block">
                  Kompyuter yoki telefondan rasm tanlang
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {t.uploadNotice}
                </span>
              </label>

              {customBgUrl && (
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-purple-500 relative shrink-0">
                  <img src={customBgUrl} alt="Custom Background" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 px-1 rounded bg-black/70 text-[9px] text-purple-300">
                    Faol
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Dimness Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">{t.bgDimness}</span>
              <span className="font-mono text-purple-400">{dimness}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={90}
              step={5}
              value={dimness}
              onChange={(e) => setDimness(parseInt(e.target.value, 10))}
              className="w-full h-2 rounded-lg bg-zinc-800 accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Star Twinkle Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-medium text-slate-200">{t.starAnimation}</span>
            </div>
            <button
              onClick={() => setStars(!stars)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                stars ? 'bg-purple-600' : 'bg-zinc-800'
              }`}
            >
              <div 
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  stars ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="py-3 px-4 rounded-xl text-xs font-semibold border border-zinc-800 text-slate-400 hover:text-white hover:bg-zinc-900 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetToDefault}</span>
            </button>

            <button
              onClick={handleSave}
              className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              {t.saveSettings}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
