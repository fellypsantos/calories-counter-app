import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IFoodRecord } from '../interfaces/IFoodRecord';
import DataBase from '../databases';
import dayjs from 'dayjs';
import Time from '../Utils/Time';

interface IFoodContext {
  foodHistory: IFoodRecord[];
  addFoodRecord(foodRecord: IFoodRecord): void;
}

const ProfileContext = createContext<IFoodContext | null>(null);

interface IProps {
  children: React.ReactNode,
}

const FoodProvider = ({ children }: IProps) => {

  const [foodHistory, setFoodHistory] = useState<IFoodRecord[]>([]);

  const addFoodRecord = useCallback((foodRecord: IFoodRecord) => {

    DataBase.addFoodRecord(foodRecord, (addedFoodRecord => {
      if (addedFoodRecord) setFoodHistory([addedFoodRecord, ...foodHistory]);
    }));
  }, [foodHistory]);

  useEffect(() => {

    DataBase.getFoodHistory(Time.ISO8601Format(dayjs()), (foodHistoryResult) => {

      setFoodHistory(foodHistoryResult);
    });
  }, []);

  const contextValues = useMemo(() => ({
    foodHistory, addFoodRecord

  }), [foodHistory, addFoodRecord]);

  return (
    <ProfileContext.Provider value={contextValues}>
      {children}
    </ProfileContext.Provider>
  )
}

const useFoodRecord = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error(
      'useFoodRecord must be used within a FoodProvider',
    );
  }

  return context;
}

export { FoodProvider, useFoodRecord };
