import { View } from 'react-native';
import { BannerAdSize, BannerAd } from 'react-native-google-mobile-ads';
import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { usePremium } from '../../hooks/premium';
import { useUpdater } from '../../hooks/updater';
import { useAppTranslation } from '../../hooks/translation';

import ButtonStrech from '../ButtonStretch';
import ProgressIndicatorText from '../ProgressIndicatorText';
import AdUnits from '../../AdUnits';

export default function (props: BottomTabBarProps) {

  const { isPremiumTime } = usePremium();
  const { Translate } = useAppTranslation();

  const {
    updateButtonVisible,
    installDownloadedUpdate,
    downloadProgress
  } = useUpdater();

  return (
    <View>
      {downloadProgress > 0 && <ProgressIndicatorText value={downloadProgress} />}

      {
        updateButtonVisible && (
          <ButtonStrech
            isBlinking
            text={Translate('Updater.InstallUpdate')}
            onPress={installDownloadedUpdate} />
        )
      }

      {
        !isPremiumTime && (
          <BannerAd
            unitId={AdUnits.BannerMainFooter}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          />
        )
      }

      <BottomTabBar {...props} />
    </View>
  )
}
