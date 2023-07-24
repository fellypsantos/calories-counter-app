import { IProfile } from "./IProfile";

export default interface IProfileRepository {
  getProfileData(): Promise<IProfile | null>;
  addProfile(profile: IProfile): Promise<boolean>;
}
