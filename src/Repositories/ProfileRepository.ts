import { SQLiteDatabase } from "react-native-sqlite-storage";
import { IProfile } from "../interfaces/IProfile";
import IProfileRepository from "../interfaces/IProfileRepository";

export default class ProfileRepository implements IProfileRepository {
  private database: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.database = db;
  }

  getProfileData = async (): Promise<IProfile | null> => {
    return new Promise((resolve, reject) => {
      this.database.transaction(tx => {
        tx.executeSql('SELECT * FROM profile', undefined, (_, results) => {
          if (results.rows.length === 0) {
            resolve(null);
          }

          const profile = results.rows.item(0);
          resolve(profile);
        });
      }, (error) => reject(error.message));
    });
  }

  addProfile(profile: IProfile): Promise<boolean> {
    return new Promise((resolve, reject) => {
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

      this.database.transaction(tx => {
        tx.executeSql(sqlToRun, sqlValues, (_, results) => {
          resolve(results.rowsAffected > 0);
        })
      }, (error) => reject(error.message));
    });
  }

  updateProfile(profile: IProfile): Promise<boolean> {
    return new Promise((resolve, reject) => {

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

      this.database.transaction(tx => {
        tx.executeSql(sqlToRun, sqlValues, (_, results) => {
          resolve(results.rowsAffected > 0);
        });
      }, (error) => reject(error.message));
    });
  }
}
