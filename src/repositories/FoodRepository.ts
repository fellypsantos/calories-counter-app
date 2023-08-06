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

  addFoodRecord(foodRecord: IFoodRecord): Promise<IFoodRecord | null> {
    return new Promise((resolve, reject) => {
      const { name, kcal, categoryLevel, timestamp } = foodRecord;

      const sqlValues = [name, kcal, categoryLevel, timestamp];

      const query = 'INSERT INTO food_registry(name, kcal, categoryLevel, timestamp) VALUES(?,?,?,?)';

      this.database.transaction(tx => {
        tx.executeSql(query, sqlValues, (_, results) => {
          if (results.rowsAffected > 0) {
            const newFoodRecord = {
              id: results.insertId,
              ...foodRecord,
            };

            resolve(newFoodRecord);
          }

          else resolve(null);
        });
      }, (error) => reject(error.message));
    });
  }

  updateFoodRegistry(foodRecord: IFoodRecord): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const { id, name, kcal, categoryLevel, timestamp } = foodRecord;
      const sqlData = [name, kcal, categoryLevel, timestamp, id];

      this.database.transaction(tx => {
        tx.executeSql(
          'UPDATE food_registry SET name=?, kcal=?, categoryLevel=?, timestamp=? WHERE id=?',
          sqlData,
          (_, results) => resolve(results.rowsAffected === 1),
        );
      }, (error) => reject(error.message))
    });
  }

  deleteFoodRegistry(foodRecord: IFoodRecord): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.database.transaction(tx => {
        tx.executeSql('DELETE FROM food_registry WHERE id=?',
          [foodRecord.id],
          (_, results) => resolve(results.rowsAffected > 0),
        );
      }, (error) => reject(error.message));
    });
  }
}
