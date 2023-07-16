import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

interface IPremiumContext {
  isPremiumTime: boolean;
  enablePremiumTime(): void;
  disablePremiumTime(): void;
}

interface IProps {
  children: React.ReactNode;
}

const PremiumContext = createContext<IPremiumContext | null>(null);

const PremiumProvider = ({ children }: IProps) => {

  const [isPremiumTime, setIsPremiumTime] = useState(false);

  const enablePremiumTime = () => { }

  const disablePremiumTime = () => { }

  useEffect(() => { }, []); // check premium expiration every minute

  const contextValue = useMemo(
    () => ({
      isPremiumTime,
      enablePremiumTime,
      disablePremiumTime
    }),
    [
      isPremiumTime,
      enablePremiumTime,
      disablePremiumTime
    ],
  );

  return (
    <PremiumContext.Provider value={contextValue}>
      {children}
    </PremiumContext.Provider>
  );
};

const usePremium = (): IPremiumContext => {
  const context = useContext(PremiumContext);

  if (!context) {
    throw new Error(
      'usePremium must be used within a PremiumProvider',
    );
  }

  return context;
};

export { PremiumProvider, usePremium };
