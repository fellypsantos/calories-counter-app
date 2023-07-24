import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { IFoodRecord } from '../interfaces/IFoodRecord';

export default class DataBase {
  static db: SQLiteDatabase;

  static open = (): Promise<SQLiteDatabase> => {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        this.db = SQLite.openDatabase({ name: 'appDB', createFromLocation: '~database.sqlite' },
          () => {
            if (__DEV__) console.log('DATABASE SUCCESSFULLY OPENED!');
            resolve(this.db);
          },
          error => {
            reject(error.message);
          }
        );
      }
    });
  };

  static validateConnection = () => {
    if (!this.db) throw new Error("Database connection is closed.");
  };

  static addFoodRecord = (foodRecord: IFoodRecord, callback: (newFoodRecord: IFoodRecord | null) => void) => {
    this.validateConnection();

    const { name, kcal, categoryLevel, timestamp } = foodRecord;

    const sqlValues = [name, kcal, categoryLevel, timestamp];

    const query = 'INSERT INTO food_registry(name, kcal, categoryLevel, timestamp) VALUES(?,?,?,?)';

    this.db.transaction(tx => {
      tx.executeSql(query, sqlValues, (_, results) => {
        if (results.rowsAffected > 0) {
          const newFoodRecord = {
            id: results.insertId,
            ...foodRecord,
          };

          callback(newFoodRecord);
        }

        else callback(null);
      },
      );
    });
  };

  static updateFoodRegistry = (foodRecord: IFoodRecord, callback: (success: boolean) => void) => {
    this.validateConnection();

    const {
      id,
      name,
      kcal,
      categoryLevel,
      timestamp
    } = foodRecord;

    const sqlData = [
      name,
      kcal,
      categoryLevel,
      timestamp,
      id,
    ];

    this.db.transaction(tx => {
      tx.executeSql(
        'UPDATE food_registry SET name=?, kcal=?, categoryLevel=?, timestamp=? WHERE id=?',
        sqlData,
        (_, results) => {
          callback(results.rowsAffected == 1)
        },
      );
    });
  };

  static deleteFoodRegistry = (foodRecord: IFoodRecord, callback: (success: boolean) => void) => {
    this.validateConnection();

    this.db.transaction(tx => {
      tx.executeSql('DELETE FROM food_registry WHERE id=?',
        [foodRecord.id],
        (_, results) => {
          callback(results.rowsAffected > 0)
        },
      );
    });
  };

  static setLastPremiumTimestamp = (timestamp: string, callback: (success: boolean) => void) => {
    this.validateConnection();

    this.db.transaction(tx => {
      tx.executeSql('UPDATE admob SET lastRewardTimestamp=?', [timestamp],
        (_, results) => {
          callback(results.rowsAffected > 0);
        },
      );
    });
  }

  static getLastPremiumTimestamp = (callback: (timestamp: string) => void) => {
    this.validateConnection();

    this.db.transaction(tx => {
      tx.executeSql('SELECT lastRewardTimestamp FROM admob', undefined, (_, results) => {
        callback(results.rows.item(0).lastRewardTimestamp);
      });
    });
  };
}
