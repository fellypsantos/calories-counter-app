import ProfileRepository from "../repositories/ProfileRepository";
import IProfileRepository from "../interfaces/IProfileRepository";
import DataBase from "../databases";
import { IProfile } from "../interfaces/IProfile";

export default class ProfileService {
  private profileRepository: IProfileRepository;

  constructor() {
    this.profileRepository = new ProfileRepository(DataBase.db);
  }

  async getProfileData(): Promise<IProfile | null> {
    return await this.profileRepository.getProfileData();
  }

  async addProfile(profile: IProfile): Promise<boolean> {
    return await this.profileRepository.addProfile(profile);
  }

  async updateProfile(profile: IProfile): Promise<boolean> {
    return await this.profileRepository.updateProfile(profile);
  }
}
