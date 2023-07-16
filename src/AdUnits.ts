import { TestIds } from 'react-native-google-mobile-ads';
import { BANNER_MAIN_FOOTER, INTERSTITIAL_GENERIC, REWARDED_TEMP_DISABLE_ADS } from '@env';

export default {
  BannerMainFooter: __DEV__ ? TestIds.BANNER : BANNER_MAIN_FOOTER,
  InterestitialGeneric: __DEV__ ? TestIds.INTERSTITIAL : INTERSTITIAL_GENERIC,
  RerwardedTempDisableAds: __DEV__ ? TestIds.REWARDED : REWARDED_TEMP_DISABLE_ADS,
}
