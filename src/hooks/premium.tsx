import dayjs from 'dayjs';
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import DataBase from '../databases';
import Time from '../Utils/Time';
import PremiumService from '../services/PremiumService';

interface IPremiumContext {
  isPremiumTime: boolean;
  enablePremiumTime(timestamp: dayjs.Dayjs): void;
}

interface IProps {
  children: React.ReactNode;
}

const MAX_MINUTES_PREMIUM_TIME: number = 240;

const PremiumContext = createContext<IPremiumContext | null>(null);

const PremiumProvider = ({ children }: IProps) => {

  const [isPremiumTime, setIsPremiumTime] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);

  const premiumService = useMemo(() => new PremiumService(), []);

  const enablePremiumTime = async (timestamp: dayjs.Dayjs) => {

    const success = await premiumService.setLastPremiumTimestamp(Time.ISO8601Format(timestamp));
    if (success) setIsPremiumTime(true);
  }

  const executePremiumTimeVerification = () => {
    DataBase.getLastPremiumTimestamp((timestamp) => {
      const minutesPassed = dayjs().diff(timestamp, 'minutes');
      setIsPremiumTime(minutesPassed < MAX_MINUTES_PREMIUM_TIME);
    });
  }

  useEffect(() => {

    executePremiumTimeVerification();

    if (isPremiumTime && timer === null) {
      const interval = setInterval(executePremiumTimeVerification, 1000);
      setTimer(interval);
    }

    else if (!isPremiumTime && timer !== null) {
      clearInterval(timer);
      setTimer(null);
    }
  }, [isPremiumTime, timer]);

  const contextValue = useMemo(
    () => ({
      isPremiumTime,
      enablePremiumTime,
    }),
    [
      isPremiumTime,
      enablePremiumTime,
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
