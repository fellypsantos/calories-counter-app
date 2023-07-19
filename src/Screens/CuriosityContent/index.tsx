import MainTitle from "../../components/MainTitle";
import Subtitle from "../../components/Subtitle";
import Icon from '@expo/vector-icons/FontAwesome5';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

import Colors from "../../Colors";
import SmallBoxContent from "../../components/SmallBoxContent";
import { useNavigation } from "@react-navigation/native";

import { Scrollable, Container, CloseIconBox, NativeBannerContainer } from "./styles";
import { useAppTranslation } from "../../hooks/translation";
import AdUnits from "../../AdUnits";
import { usePremium } from "../../hooks/premium";

export default function CuriosityContent() {

  const { Translate } = useAppTranslation();
  const { isPremiumTime } = usePremium();
  const navigation = useNavigation();

  return (
    <Scrollable>
      <Container>
        <CloseIconBox onPress={() => navigation.goBack()}>
          <Icon name="times-circle" size={20} color="#666" />
        </CloseIconBox>

        <Icon name="fire" size={40} color={Colors.Primary} />
        <MainTitle>{Translate('Curiosity.BasalEnergy.Title')}</MainTitle>
        <Subtitle renderAsParagraph>{'\t\t\t'}{Translate('Curiosity.BasalEnergy.Paragraph1')}</Subtitle>

        {
          !isPremiumTime && (
            <NativeBannerContainer>
              <BannerAd unitId={AdUnits.BannerMainFooter} size={BannerAdSize.MEDIUM_RECTANGLE} />
            </NativeBannerContainer>
          )
        }

        <MainTitle>{Translate('Curiosity.HowToCalculate.Title')}</MainTitle>
        <Subtitle renderAsParagraph>{'\t\t\t'}{Translate('Curiosity.HowToCalculate.Paragraph1')}</Subtitle>
        <SmallBoxContent title={Translate('Curiosity.HowToCalculate.Male.Title')} content={Translate('Curiosity.HowToCalculate.Male.Formula')} />
        <SmallBoxContent title={Translate('Curiosity.HowToCalculate.Female.Title')} content={Translate('Curiosity.HowToCalculate.Female.Formula')} />

        <MainTitle>{Translate('Curiosity.BasalMetabolismAndCalories.Title')}</MainTitle>
        <Subtitle renderAsParagraph>{'\t\t\t'}{Translate('Curiosity.BasalMetabolismAndCalories.Paragraph1')}</Subtitle>
      </Container>
    </Scrollable>
  );
}
