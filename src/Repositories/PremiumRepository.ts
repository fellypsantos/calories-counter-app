import { SQLiteDatabase } from "react-native-sqlite-storage";
import IPremiumRepository from "../interfaces/IPremiumRepository";

export default class PremiumRepository implements IPremiumRepository {
  private database: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.database = db;
  }

  setLastPremiumTimestamp(timestamp: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.database.transaction(tx => {
        tx.executeSql('UPDATE admob SET lastRewardTimestamp=?', [timestamp],
          (_, results) => resolve(results.rowsAffected > 0),
        );
      }, (error) => reject(error.message));
    });
  }
}
