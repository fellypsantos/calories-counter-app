import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { IProfile } from '../interfaces/IProfile';
import { IFoodRecord } from '../interfaces/IFoodRecord';

export default class DataBase {
  static db: SQLiteDatabase;

  static open = () => {
    if (!this.db) {
      this.db = SQLite.openDatabase({ name: 'appDB', createFromLocation: '~database.sqlite' },
        () => { console.log('DATABASE SUCCESSFULLY OPENED!'); },
      );
    }
    return this.db;
  };

  static validateConnection = () => {
    if (!this.db) throw new Error("Database connection is closed.");
  };

  static getProfileData = (callback: (result: IProfile | null) => void) => {
    this.validateConnection();

    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM profile', undefined, (_, results) => {
        if (results.rows.length === 0) {
          callback(null);
          return;
        }

        const profile: IProfile = results.rows.item(0);
        callback(profile);
      });
    });
  };

  static addProfile = (profile: IProfile, callback: (success: boolean) => void) => {
    this.validateConnection();

    const {
      name,
      phrase,
      weight,
      height,
      age,
      gender,
      language,
      activityFactor,
      createdAt
    } = profile;

    const sqlToRun = 'INSERT INTO profile(name, phrase, weight, height, age, gender, language, activityFactor, createdAt) VALUES (?,?,?,?,?,?,?,?,?)';

    const sqlValues = [
      name,
      phrase,
      weight,
      height,
      age,
      gender,
      language,
      activityFactor,
      createdAt
    ];

    this.db.transaction(tx => {
      tx.executeSql(sqlToRun, sqlValues,
        (_, results) => {
          callback(results.rowsAffected > 0);
        });
    });
  };

  static updateProfile = (profile: IProfile, callback: (success: boolean) => void) => {
    this.validateConnection();

    const {
      id,
      name,
      phrase,
      weight,
      height,
      age,
      gender,
      language,
      activityFactor,
    } = profile;

    const sqlToRun = `UPDATE profile
      SET name=?,
      phrase=?,
      weight=?,
      height=?,
      age=?,
      gender=?,
      language=?,
      activityFactor=? WHERE id=?`;

    const sqlValues = [
      name,
      phrase,
      weight,
      height,
      age,
      gender,
      language,
      activityFactor,
      id,
    ];

    this.db.transaction(tx => {
      tx.executeSql(sqlToRun, sqlValues, (_, results) => {
        callback(results.rowsAffected > 0);
      });
    });
  }

  static truncateProfile = () => {
    this.db.transaction(tx => {
      tx.executeSql('DELETE FROM profile', undefined, () => {
        console.log('✅ PROFILE TABLE CLEARED');
      });
    });
  }

  static getFoodHistory = (dateISO8061: string, callback: (foodHistoryResult: IFoodRecord[]) => void) => {
    this.validateConnection();

    this.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM food_registry WHERE date(timestamp) = date(?) ORDER BY id DESC',
        [dateISO8061],
        (_, results) => {
          if (results.rows.length > 0) {
            callback(results.rows.raw());
          }

          else callback([]);
        },
      );
    });
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
