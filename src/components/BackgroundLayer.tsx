import React, { useMemo } from 'react';
import { UserPreferences } from '../types';

interface BackgroundLayerProps {
  preferences: UserPreferences;
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ preferences }) => {
  const { backgroundPreset, customBgUrl, bgDimness, starsAnimation, theme } = preferences;

  // Generate deterministic stars for twinkling effect
  const stars = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      top: `${(i * 17) % 100}%`,
      left: `${(i * 23 + 7) % 100}%`,
      size: (i % 3) + 1.5,
      delay: `${(i % 5) * 0.7}s`,
      duration: `${2.5 + (i % 4)}s`,
      opacity: 0.2 + (i % 5) * 0.15,
    }));
  }, []);

  let bgStyle: React.CSSProperties = {};

  if (customBgUrl) {
    bgStyle = {
      backgroundImage: `url(${customBgUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    };
  } else {
    switch (backgroundPreset) {
      case 'classic_library':
      case 'default':
        // High quality luxury library banner generated asset
        bgStyle = {
          backgroundImage: `url('/src/assets/images/hero_library_banner_1792381373509.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundAttachment: 'fixed'
        };
        break;
      case 'stars':
        bgStyle = {
          background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
        };
        break;
      case 'aurora':
        bgStyle = {
          background: 'radial-gradient(circle at 50% 20%, #4c1d95 0%, #1e1145 40%, #0b071a 100%)',
        };
        break;
      case 'obsidian':
        bgStyle = {
          background: theme === 'dark' ? '#09090b' : '#f8fafc',
        };
        break;
      case 'parchment':
        bgStyle = {
          background: theme === 'dark' ? '#1c1917' : '#fafaf9',
        };
        break;
      default:
        bgStyle = {
          background: theme === 'dark' ? '#030712' : '#ffffff',
        };
    }
  }

  // Calculate overlay darkness based on preferences and theme
  const dimnessPercentage = bgDimness / 100;
  const overlayBg = theme === 'dark' 
    ? `rgba(5, 5, 8, ${Math.max(0.35, dimnessPercentage)})`
    : `rgba(255, 255, 255, ${Math.max(0.2, 1 - dimnessPercentage * 0.6)})`;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-all duration-500">
      {/* Base Background Image or Color */}
      <div 
        className="absolute inset-0 transition-all duration-700 filter"
        style={bgStyle}
      />

      {/* Dimness & Mood Scrim */}
      <div 
        className="absolute inset-0 backdrop-blur-[2px] transition-colors duration-500"
        style={{ backgroundColor: overlayBg }}
      />

      {/* Deep gradient fade towards bottom for readability */}
      {theme === 'dark' && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/85" />
      )}

      {/* Animated Twinkling Stars */}
      {starsAnimation && (
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white twinkle-star"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: star.delay,
                '--duration': star.duration,
                opacity: star.opacity,
                boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </div>
  );
};
