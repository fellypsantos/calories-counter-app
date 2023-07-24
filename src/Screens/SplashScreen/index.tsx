import { useEffect, useState } from 'react';
import { AppDescription, AppLogo, AppStart, AppStartText, AppTitle, Container } from "./styles";

import { useAppTranslation } from "../../hooks/translation";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useProfile } from '../../hooks/profile';

import AppLogoSource from '../../../assets/images/eating.png';
import FullScreenLoading from '../../components/FullScreenLoading';

export default function () {
  const { Translate } = useAppTranslation();
  const [loading, setLoading] = useState(true);
  const { profile, loadingProfile } = useProfile();

  const navigation = useNavigation();

  function openMainScreenWithBottomTabs() {
    navigation.dispatch(CommonActions.reset({
      index: 1,
      routes: [{ name: 'EntryPoint' }]
    }));
  }

  useEffect(() => {
    if (loadingProfile) return;
    if (profile?.createdAt) openMainScreenWithBottomTabs();
    setLoading(false);

  }, [loadingProfile]);

  return (
    <Container>
      {loading ? <FullScreenLoading /> : (
        <>
          <AppTitle>{Translate('App.Name')}</AppTitle>
          <AppLogo source={AppLogoSource} />
          <AppDescription>{Translate('App.Description')}</AppDescription>

          <AppStart onPress={() => navigation.navigate('Settings')}>
            <AppStartText>{Translate('Buttons.StartNow')}</AppStartText>
          </AppStart>
        </>
      )}
    </Container>
  )
}
