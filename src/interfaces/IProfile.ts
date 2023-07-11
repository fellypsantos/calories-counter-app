export interface IProfile {
  id?: string;
  name: string;
  phrase: string;
  weight: number;
  height: number;
  age: number;
  gender: string;
  activityFactor: number;
  language: string;
  createdAt: string | null;
}
