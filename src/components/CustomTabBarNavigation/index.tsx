import { View } from 'react-native';
import { TestIds, BannerAdSize, BannerAd } from 'react-native-google-mobile-ads';
import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';

export default function (props: BottomTabBarProps) {

    return (
        <View>
            <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
            <BottomTabBar {...props} />
        </View>
    )
}