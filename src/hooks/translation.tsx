import React, { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocales } from 'expo-localization';

interface ITranslationContext {
  Translate(key: string): string;
  setCurrentLanguage(languageKey: string): void;
  selectedLanguage: string;
}

interface IProps {
  children: React.ReactNode;
}

const TranslationContext = createContext<ITranslationContext | null>(null);

const TranslationProvider = ({ children }: IProps) => {
  const { t: Translate, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(getLocales()[0]?.languageCode || 'en');

  const setCurrentLanguage = useCallback((languageKey: string) => {
    i18n.changeLanguage(languageKey);
    setSelectedLanguage(languageKey);
  }, []);

  useEffect(() => {
    setCurrentLanguage(selectedLanguage);
  }, []);

  const contextValue = useMemo(
    () => ({ Translate, selectedLanguage, setCurrentLanguage }),
    [Translate, selectedLanguage, setCurrentLanguage],
  );

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

const useAppTranslation = (): ITranslationContext => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error(
      'useAppTranslation must be used within a TranslationProvider',
    );
  }

  return context;
};

export { TranslationProvider, useAppTranslation };
