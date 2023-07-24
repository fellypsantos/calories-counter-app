import { IFoodRecord } from "./IFoodRecord";

export default interface IFoodRepository {
  getFoodHistory(dateISO8061: string): Promise<IFoodRecord[]>;
}
