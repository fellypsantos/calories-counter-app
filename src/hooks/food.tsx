import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IFoodRecord } from '../interfaces/IFoodRecord';
import DataBase from '../databases';
import dayjs, { Dayjs } from 'dayjs';
import Time from '../Utils/Time';

interface IFoodContext {
  foodHistory: IFoodRecord[];
  foodHistoryFromDate: IFoodRecord[];
  loadingFoodHistoryFromDate: boolean;
  caloriesIngested: number;
  caloriesIngestedInDate: number;
  addFoodRecord(foodRecord: IFoodRecord): void;
  loadFoodHistoryFromDate(date: Dayjs): void;
}

const ProfileContext = createContext<IFoodContext | null>(null);

interface IProps {
  children: React.ReactNode,
}

const FoodProvider = ({ children }: IProps) => {

  const [foodHistory, setFoodHistory] = useState<IFoodRecord[]>([]);

  const [loadingFoodHistoryFromDate, setLoadingFoodHistoryFromDate] = useState(false);
  const [foodHistoryFromDate, setFoodHistoryFromDate] = useState<IFoodRecord[]>([]);
  const [caloriesIngestedInDate, setCaloriesIngestedInDate] = useState(0);

  const addFoodRecord = useCallback((foodRecord: IFoodRecord) => {

    DataBase.addFoodRecord(foodRecord, (addedFoodRecord => {
      if (addedFoodRecord) {
        const updatedList = [addedFoodRecord, ...foodHistory];
        setFoodHistory(updatedList);
        setFoodHistoryFromDate(updatedList);
      }
    }));
  }, [foodHistory]);

  const loadFoodHistoryFromDate = (date: Dayjs) => {
    setLoadingFoodHistoryFromDate(true);

    DataBase.getFoodHistory(Time.ISO8601Format(date), foodHistoryResult => {

      setFoodHistoryFromDate(foodHistoryResult);
      setCaloriesIngestedInDate(calculateCaloriesIngested(foodHistoryResult));
      setLoadingFoodHistoryFromDate(false);
    });
  }

  const calculateCaloriesIngested = (foodHistory: IFoodRecord[]) => {
    return foodHistory.reduce((sum: number, foodRecord) => sum + foodRecord.kcal, 0);
  }

  const caloriesIngested = useMemo<number>(() => calculateCaloriesIngested(foodHistory), [foodHistory]);

  useEffect(() => {

    DataBase.getFoodHistory(Time.ISO8601Format(dayjs()), (foodHistoryResult) => {

      setFoodHistory(foodHistoryResult);
      setFoodHistoryFromDate(foodHistoryResult);
      setCaloriesIngestedInDate(calculateCaloriesIngested(foodHistoryResult));
    });
  }, []);

  const contextValues = useMemo(() => ({
    foodHistory,
    addFoodRecord,
    caloriesIngested,
    foodHistoryFromDate,
    loadFoodHistoryFromDate,
    loadingFoodHistoryFromDate,
    caloriesIngestedInDate

  }), [foodHistory,
    addFoodRecord,
    caloriesIngested,
    foodHistoryFromDate,
    loadFoodHistoryFromDate,
    loadingFoodHistoryFromDate,
    caloriesIngestedInDate]);

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
