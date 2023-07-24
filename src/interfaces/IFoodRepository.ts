import { IFoodRecord } from "./IFoodRecord";

export default interface IFoodRepository {
  getFoodHistory(dateISO8061: string): Promise<IFoodRecord[]>;
  addFoodRecord(foodRecord: IFoodRecord): Promise<IFoodRecord | null>;
  updateFoodRegistry(foodRecord: IFoodRecord): Promise<boolean>;
  deleteFoodRegistry(foodRecord: IFoodRecord): Promise<boolean>;
}
