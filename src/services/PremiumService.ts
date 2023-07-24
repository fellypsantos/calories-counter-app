import DataBase from "../databases";
import IPremiumRepository from "../interfaces/IPremiumRepository";
import PremiumRepository from "../repositories/PremiumRepository";

export default class PremiumService {
  private premiumRepository: IPremiumRepository;

  constructor() {
    this.premiumRepository = new PremiumRepository(DataBase.db);
  }

  async setLastPremiumTimestamp(timestamp: string): Promise<boolean> {
    return await this.premiumRepository.setLastPremiumTimestamp(timestamp);
  }

  async getLastPremiumTimestamp(): Promise<string> {
    return await this.premiumRepository.getLastPremiumTimestamp();
  }
}
