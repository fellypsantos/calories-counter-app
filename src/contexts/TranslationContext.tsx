import { createContext, useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next";


type TranslationContextType = {
  Translator(key: string): string;
}

interface ITranslationContextProps {
  children: React.ReactNode;
}

export const TranslationContext = createContext<TranslationContextType>({
  Translator: () => "",
});

export const TranslationProvider = ({ children }: ITranslationContextProps) => {

  const { t: Translator } = useTranslation();

  const contextValue: TranslationContextType = {
    Translator
  }

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  )
}
