import DataBase from "../databases";
import { IFoodRecord } from "../interfaces/IFoodRecord";
import IFoodRepository from "../interfaces/IFoodRepository";
import FoodRepository from "../repositories/FoodRepository";

export default class FoodService {
  private foodRepository: IFoodRepository;

  constructor() {
    this.foodRepository = new FoodRepository(DataBase.db);
  }

  async getFoodHistory(dateISO8061: string): Promise<IFoodRecord[]> {
    return await this.foodRepository.getFoodHistory(dateISO8061);
  }

  async addFoodRecord(foodRecord: IFoodRecord): Promise<IFoodRecord | null> {
    return await this.foodRepository.addFoodRecord(foodRecord);
  }

  async updateFoodRegistry(foodRecord: IFoodRecord): Promise<boolean> {
    return await this.foodRepository.updateFoodRegistry(foodRecord);
  }

  async deleteFoodRegistry(foodRecord: IFoodRecord): Promise<boolean> {
    return await this.foodRepository.deleteFoodRegistry(foodRecord);
  }
}
