import { useRef, useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import Icon from '@expo/vector-icons/FontAwesome5';

import { useRewardedAd } from 'react-native-google-mobile-ads';

import {
  Container,
  Title,
  Subtitle,
  ButtonsContainer,
  ActionButton,
  ActionButtonText,
  IconContainer,
  Scroll,
} from './styles';

import { useAppTranslation } from '../../hooks/translation';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Colors';
import AdUnits from '../../AdUnits';
import Toaster from '../../Utils/Toaster';
import { usePremium } from '../../hooks/premium';

export default function DisableAdsIntro() {

  const confettiCannon = useRef<ConfettiCannon>(null);
  const [isLoadingAd, setLoadingAd] = useState(true);

  const { load, isLoaded, show, isEarnedReward } = useRewardedAd(AdUnits.RerwardedTempDisableAds);
  const { Translate } = useAppTranslation();
  const { enablePremiumTime } = usePremium();

  const navigation = useNavigation();

  useEffect(() => load(), [load]);

  useEffect(() => {

    if (isLoaded) setLoadingAd(false);
  }, [isLoaded]);

  useEffect(() => {

    if (isEarnedReward) {
      enablePremiumTime();
      confettiCannon.current?.start();
    }
  }, [isEarnedReward]);

  const handleShowRewardAd = () => {

    if (isLoaded) show();

    else {
      Toaster.ShowToast({ text: Translate('RewardFailedToLoad'), position: 'CENTER', duration: 'LONG' });
      setLoadingAd(true);
      load();
    }
  }

  return (
    <Scroll>
      <Container>
        <ConfettiCannon
          ref={confettiCannon}
          count={35}
          autoStart={false}
          origin={{ x: -15, y: 0 }}
        />

        <IconContainer>
          <Icon name="ad" color={Colors.TextPrimary} size={40} />
        </IconContainer>

        <Title>{Translate('AdMob.Title.DisableAds')}</Title>
        <Subtitle>{Translate('AdMob.Paragraph1')}</Subtitle>
        <Subtitle>{Translate('AdMob.Paragraph2')}</Subtitle>

        <ButtonsContainer>
          <ActionButton showAsCancel onPress={() => navigation.goBack()}>
            <ActionButtonText showAsCancel>
              {Translate('Buttons.Back')}
            </ActionButtonText>
          </ActionButton>
          {isLoadingAd ? (
            <ActivityIndicator color={Colors.Primary} size={25} style={{ paddingLeft: 30 }} />
          ) : (
            <ActionButton onPress={handleShowRewardAd}>
              <ActionButtonText>
                {Translate('Buttons.DisableNow')}
              </ActionButtonText>
            </ActionButton>
          )}
        </ButtonsContainer>

      </Container>
    </Scroll>
  )
}
