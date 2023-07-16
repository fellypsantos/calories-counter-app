import { ActivityIndicator } from 'react-native';
import { useRef, useState } from 'react';
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
} from './styles';

import { useAppTranslation } from '../../hooks/translation';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Colors';

export default function DisableAdsIntro() {

  const confettiCannon = useRef<ConfettiCannon>(null);

  const [userRewarded, setUserRewarded] = useState(false);
  const [isLoadingAd, setLoadingAd] = useState(false);

  const { Translate } = useAppTranslation();
  const { isLoaded, show, isEarnedReward } = useRewardedAd();

  const navigation = useNavigation();

  const handleShowRewardAd = () => { }

  return (
    <Container>
      <ConfettiCannon
        ref={confettiCannon}
        count={50}
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
  )
}
