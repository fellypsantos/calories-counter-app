import { useState, useCallback, useMemo, useRef } from "react";
import { Alert, KeyboardAvoidingView, TextInput } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import Icon from '@expo/vector-icons/FontAwesome5';

import MainTitle from "../../components/MainTitle";
import Subtitle from "../../components/Subtitle";
import TextInputCustom from "../../components/TextInputCustom";
import { useAppTranslation } from "../../hooks/translation";
import { IProfile } from "../../interfaces/IProfile";
import { useProfile } from "../../hooks/profile";

import ButtonDefault from "../../components/ButtonDefault";
import Picker from "../../components/Picker";

import Colors from "../../Colors";
import { ButtonsContainer, Container, MainView } from "./styles";
import Toaster from "../../Utils/Toaster";
import { BottomTabNavigationProps } from "../../routes/BottomTabs";

export default function () {
  const { Translate, selectedLanguage, setCurrentLanguage } = useAppTranslation();
  const { profile, setProfile, addProfile, updateProfile, loadingProfile } = useProfile();

  const ref_profilePhrase = useRef<TextInput>(null);
  const ref_weight = useRef<TextInput>(null);
  const ref_height = useRef<TextInput>(null);
  const ref_age = useRef<TextInput>(null);

  const navigation = useNavigation<BottomTabNavigationProps>();

  const formLabelTranslated = useMemo(() => ({
    name: Translate('Settings.Name'),
    phrase: Translate('Settings.ProfilePhrase'),
    weight: Translate('Settings.Weight'),
    height: Translate('Settings.Height'),
    age: Translate('Settings.Age'),
    gender: Translate('Settings.Gender'),
    activityProfile: Translate('Settings.ActivityProfile'),
  }), [selectedLanguage]);

  const genderOptions = useMemo(() => ([
    { label: Translate('Settings.Options.Gender.Male'), value: 'M' },
    { label: Translate('Settings.Options.Gender.Female'), value: 'F' },
  ]), [selectedLanguage]);

  const activityFactorOptions = useMemo(() => ([
    {
      label: Translate('Settings.Options.ActivityFactor.Sedentary.Title'),
      description: Translate('Settings.Options.ActivityFactor.Sedentary.Description'),
      value: 1.2,
    },
    {
      label: Translate('Settings.Options.ActivityFactor.LightActive.Title'),
      description: Translate('Settings.Options.ActivityFactor.LightActive.Description'),
      value: 1.38,
    },
    {
      label: Translate('Settings.Options.ActivityFactor.ModerateActive.Title'),
      description: Translate('Settings.Options.ActivityFactor.ModerateActive.Description'),
      value: 1.53,
    },
    {
      label: Translate('Settings.Options.ActivityFactor.HighlyActive.Title'),
      description: Translate('Settings.Options.ActivityFactor.HighlyActive.Description'),
      value: 1.76,
    },
    {
      label: Translate('Settings.Options.ActivityFactor.ExtremelyActive.Title'),
      description: Translate('Settings.Options.ActivityFactor.ExtremelyActive.Description'),
      value: 2.25,
    },
  ]), [selectedLanguage]);

  const languageOptions = useMemo(() => ([
    { label: 'Português', value: 'pt' },
    { label: 'English', value: 'en' },
    { label: 'Spañol', value: 'es' },
  ]), [selectedLanguage]);

  const [currentActivityFactor, setCurrentActivityFactor] = useState(profile.activityFactor);

  const handleUpdateProfileField = (field: string, value: string | number) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSaveProfile = useCallback(() => {

    try {
      const { name, weight, height, age } = profile;
      const emptyFields = [];

      if (!name) emptyFields.push(formLabelTranslated.name);
      if (!weight) emptyFields.push(formLabelTranslated.weight);
      if (!height) emptyFields.push(formLabelTranslated.height);
      if (!age) emptyFields.push(formLabelTranslated.age);

      if (emptyFields.length > 0) {
        Alert.alert(
          Translate('Alert.Warning'),
          `${Translate('Alert.Message.FillCorrectlyFieldsBelow')}\n\n${emptyFields.join('\n')}`,
        );
        return false;
      }

      if (isNaN(weight)) throw new Error(Translate('Settings.Validations.Weight'));
      if (isNaN(height)) throw new Error(Translate('Settings.Validations.Height'));
      if (isNaN(age)) throw new Error(Translate('Settings.Validations.Age'));

      const formProfileData: IProfile = {
        ...profile,
        age: parseInt(age.toString(), 10),
        height: parseInt(height.toString(), 10),
        weight: parseFloat(weight.toString()),
        activityFactor: currentActivityFactor,
        language: selectedLanguage,
      }

      if (!profile.createdAt) {
        addProfile(formProfileData);

        navigation.dispatch(CommonActions.reset({
          index: 1,
          routes: [{ name: 'EntryPoint' }]
        }));
      }

      else {
        updateProfile(formProfileData);
        navigation.navigate('Home');
      }

      Toaster.ShowToast({ text: Translate('Toast.InformationsUpdated') });
    }
    catch (err) {
      const error = err as Error;
      Alert.alert(Translate('Alert.Warning'), error.message);
    }

  }, [profile, currentActivityFactor, selectedLanguage]);

  const handleChangeLanguage = useCallback((language: string) => {

    setCurrentLanguage(language);
    Toaster.ShowToast({ text: Translate('Settings.Language.DontForgetToSave'), position: 'CENTER' });
  }, [selectedLanguage]);

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <Container>
        <MainView>
          <Icon name="language" size={40} color={Colors.Primary} />
          <MainTitle>{Translate('Settings.Language.Title')}</MainTitle>
          <Subtitle>{Translate('Settings.Language.Description')}</Subtitle>

          <Picker
            label={Translate('Settings.Language.ChooseLanguage')}
            selectedValue={selectedLanguage}
            onValueChange={(value) => handleChangeLanguage(value as string)}
            items={languageOptions}
          />
        </MainView>

        {
          !loadingProfile && (
            <MainView>
              <Icon name="user-alt" size={40} color={Colors.Primary} />
              <MainTitle>{Translate('Settings.Title')}</MainTitle>
              <Subtitle>{Translate('Settings.Description')}</Subtitle>

              <TextInputCustom
                label={formLabelTranslated.name}
                value={profile.name}
                placeholder={Translate('Settings.Placeholder.Name')}
                onChange={(text) => handleUpdateProfileField('name', text)}
                handlePressIcon={() => handleUpdateProfileField('name', '')}
                onSubmitEditing={() => ref_profilePhrase?.current?.focus()}
              />

              <TextInputCustom
                ref={ref_profilePhrase}
                label={formLabelTranslated.phrase}
                value={profile.phrase}
                placeholder={Translate('Settings.Placeholder.ProfilePhrase')}
                onChange={text => handleUpdateProfileField('phrase', text)}
                handlePressIcon={() => handleUpdateProfileField('phrase', '')}
                autoCorrect={false}
                onSubmitEditing={() => ref_weight?.current?.focus()}
              />

              <TextInputCustom
                ref={ref_weight}
                label={formLabelTranslated.weight}
                value={profile.weight > 0 ? profile.weight?.toString() : ''}
                placeholder="50"
                keyboardType="numeric"
                onChange={text => handleUpdateProfileField('weight', text.replace(',', '.'))}
                handlePressIcon={() => handleUpdateProfileField('weight', '')}
                autoCorrect={false}
                onSubmitEditing={() => ref_height?.current?.focus()}
              />

              <TextInputCustom
                ref={ref_height}
                label={formLabelTranslated.height}
                value={profile.height > 0 ? profile.height?.toString() : ''}
                placeholder="165"
                keyboardType="numeric"
                onChange={text => handleUpdateProfileField('height', text)}
                handlePressIcon={() => handleUpdateProfileField('height', '')}
                autoCorrect={false}
                onSubmitEditing={() => ref_age?.current?.focus()}

              />

              <TextInputCustom
                ref={ref_age}
                label={formLabelTranslated.age}
                value={profile.age > 0 ? profile.age?.toString() : ''}
                placeholder="26"
                keyboardType="numeric"
                onChange={text => handleUpdateProfileField('age', text)}
                handlePressIcon={() => handleUpdateProfileField('age', '')}
                autoCorrect={false}
              />

              <Picker
                label={formLabelTranslated.gender}
                selectedValue={profile.gender}
                onValueChange={(value) => handleUpdateProfileField('gender', value as string)}
                items={genderOptions}
              />

              <Picker
                label={formLabelTranslated.activityProfile}
                selectedValue={currentActivityFactor}
                onValueChange={(value) => setCurrentActivityFactor(value as number)}
                items={activityFactorOptions}
              />

              <Subtitle>
                {activityFactorOptions.find(item => item.value === currentActivityFactor)?.description}
              </Subtitle>

              <ButtonsContainer>
                <ButtonDefault
                  text={Translate('Buttons.SaveSettings')}
                  onPress={handleSaveProfile}
                />
              </ButtonsContainer>
            </MainView>
          )
        }
      </Container>
    </KeyboardAvoidingView>
  )
}
