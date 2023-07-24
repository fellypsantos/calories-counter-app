import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IFoodRecord } from '../interfaces/IFoodRecord';
import DataBase from '../databases';
import dayjs, { Dayjs } from 'dayjs';
import Time from '../Utils/Time';
import FoodService from '../services/FoodService';

interface IFoodContext {
  foodHistory: IFoodRecord[];
  foodHistoryFromDate: IFoodRecord[];
  loadingFoodHistoryFromDate: boolean;
  caloriesIngested: number;
  caloriesIngestedInDate: number;
  addFoodRecord(foodRecord: IFoodRecord): void;
  updateFoodRecord(foodRecord: IFoodRecord): void;
  deleteFoodRecord(foodRecord: IFoodRecord): void;
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

  const foodService = useMemo(() => new FoodService(), []);

  const addFoodRecord = useCallback(async (foodRecord: IFoodRecord) => {

    const addedFoodRecord = await foodService.addFoodRecord(foodRecord);

    if (addedFoodRecord) {
      const updatedFoodRecordList = [addedFoodRecord, ...foodHistory];
      setFoodHistory(updatedFoodRecordList);
      setFoodHistoryFromDate(updatedFoodRecordList);
      setCaloriesIngestedInDate(calculateCaloriesIngested(updatedFoodRecordList));
    }
  }, [foodHistory]);

  const updateFoodRecord = useCallback(async (foodRecord: IFoodRecord) => {

    const success = await foodService.updateFoodRegistry(foodRecord);

    if (success) {
      const updatedFoodRecordList = foodHistory.map(foodItem => {
        if (foodItem.id === foodRecord.id) return foodRecord;
        else return foodItem;
      });

      setFoodHistory(updatedFoodRecordList);
      setFoodHistoryFromDate(updatedFoodRecordList);
    }
  }, [foodHistory]);

  const deleteFoodRecord = useCallback((foodRecord: IFoodRecord) => {

    DataBase.deleteFoodRegistry(foodRecord, (success) => {
      if (success) {
        const updatedFoodRecordList = foodHistory.filter(food => food.id !== foodRecord.id);
        setFoodHistory(updatedFoodRecordList);
        setFoodHistoryFromDate(updatedFoodRecordList);
      }
    });
  }, [foodHistory]);

  const loadFoodHistoryFromDate = async (date: Dayjs) => {
    setLoadingFoodHistoryFromDate(true);

    const foodHistoryResult = await foodService.getFoodHistory(Time.ISO8601Format(date));

    setFoodHistoryFromDate(foodHistoryResult);
    setCaloriesIngestedInDate(calculateCaloriesIngested(foodHistoryResult));
    setLoadingFoodHistoryFromDate(false);
  }

  const calculateCaloriesIngested = (foodHistory: IFoodRecord[]) => {
    return foodHistory.reduce((sum: number, foodRecord) => sum + foodRecord.kcal, 0);
  }

  const caloriesIngested = useMemo<number>(() => calculateCaloriesIngested(foodHistory), [foodHistory]);

  useEffect(() => {

    foodService.getFoodHistory(Time.ISO8601Format(dayjs())).then(foodHistoryResult => {
      setFoodHistory(foodHistoryResult);
      setFoodHistoryFromDate(foodHistoryResult);
      setCaloriesIngestedInDate(calculateCaloriesIngested(foodHistoryResult));
    });
  }, []);

  const contextValues = useMemo(() => ({
    foodHistory,
    addFoodRecord,
    deleteFoodRecord,
    updateFoodRecord,
    caloriesIngested,
    foodHistoryFromDate,
    loadFoodHistoryFromDate,
    loadingFoodHistoryFromDate,
    caloriesIngestedInDate,
  }), [foodHistory,
    addFoodRecord,
    deleteFoodRecord,
    updateFoodRecord,
    caloriesIngested,
    foodHistoryFromDate,
    loadFoodHistoryFromDate,
    loadingFoodHistoryFromDate,
    caloriesIngestedInDate,
  ]);

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
