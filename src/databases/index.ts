import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { IProfile } from '../interfaces/IProfile';

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
}
