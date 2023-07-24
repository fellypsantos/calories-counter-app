export default interface IPremiumRepository {
  setLastPremiumTimestamp(timestamp: string): Promise<boolean>;
}
