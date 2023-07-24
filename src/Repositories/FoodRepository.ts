import { SQLiteDatabase } from "react-native-sqlite-storage";
import { IFoodRecord } from "../interfaces/IFoodRecord";
import IFoodRepository from "../interfaces/IFoodRepository";

export default class FoodRepository implements IFoodRepository {
  private database: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.database = db;
  }

  getFoodHistory(dateISO8061: string): Promise<IFoodRecord[]> {
    return new Promise((resolve, reject) => {
      this.database.transaction(tx => {
        tx.executeSql('SELECT * FROM food_registry WHERE date(timestamp) = date(?) ORDER BY id DESC',
          [dateISO8061],
          (_, results) => resolve(results.rows.raw()),
        );
      }, (error) => reject(error.message));
    });
  }
}
