import { IFoodRecord } from "../src/interfaces/IFoodRecord";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Dashboard: undefined;
      AddFoodRegistry: { foodRecord: IFoodRecord | undefined };
      SplashScreen: undefined;
      EntryPoint: undefined;
      Home: undefined;
      History: undefined;
      Settings: undefined
      DisableAdsIntro: undefined;
      CuriosityContent: undefined;
    }
  }
}
