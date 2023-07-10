import { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator } from "react-native";
import { AppDescription, AppLogo, AppStart, AppStartText, AppTitle, Container } from "./styles";

import { useAppTranslation } from "../../hooks/translation";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useProfile } from '../../hooks/profile';

import AppLogoSource from '../../../assets/images/eating.png';

export default function () {
  const { Translate } = useAppTranslation();
  const [loading, setLoading] = useState(true);
  const { profile } = useProfile();

  const navigation = useNavigation();

  function openMainScreenWithBottomTabs() {
    navigation.dispatch(CommonActions.reset({
      index: 1,
      routes: [{ name: 'EntryPoint' }]
    }));
  }

  useEffect(() => {
    setTimeout(() => {

      if (profile.createdAt !== null) openMainScreenWithBottomTabs();
      else setLoading(false);

    }, 1800);
  }, []);

  return (
    <Container>
      {loading ? <ActivityIndicator color="#FFF" size={25} /> : (
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
