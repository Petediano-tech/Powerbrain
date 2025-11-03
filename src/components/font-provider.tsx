
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Poppins, Inter, Roboto, Lato, Open_Sans } from 'next/font/google';
import { useSettingsStore } from '@/hooks/use-settings-store';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-poppins' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500', '700'], variable: '--font-roboto' });
const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'], variable: '--font-lato' });
const opensans = Open_Sans({ subsets: ['latin'], variable: '--font-opensans' });

const fontMap = {
  poppins,
  inter,
  roboto,
  lato,
  opensans,
};

type FontContextType = {
  font: string;
  setFont: (font: string) => void;
};

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: ReactNode }) {
  const { font, setFont: setFontInStore } = useSettingsStore();

  useEffect(() => {
    document.body.classList.remove(...Object.values(fontMap).map(f => f.variable));
    const fontVariable = fontMap[font as keyof typeof fontMap]?.variable;
    if (fontVariable) {
      document.body.classList.add(fontVariable);
    }
    document.body.style.setProperty('--font-dynamic', `var(--font-${font})`);
  }, [font]);

  return (
    <FontContext.Provider value={{ font, setFont: setFontInStore }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
}
