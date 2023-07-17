import { View } from 'react-native';
import { BannerAdSize, BannerAd } from 'react-native-google-mobile-ads';
import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { usePremium } from '../../hooks/premium';
import AdUnits from '../../AdUnits';


export default function (props: BottomTabBarProps) {

  const { isPremiumTime } = usePremium();

  return (
    <View>
      {
        !isPremiumTime && <BannerAd unitId={AdUnits.BannerMainFooter} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
      }
      <BottomTabBar {...props} />
    </View>
  )
}
