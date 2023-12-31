import { useState, useMemo, useCallback, useRef } from "react";
import { Alert, KeyboardAvoidingView, TextInput } from "react-native";
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import dayjs from "dayjs";
import Icon from '@expo/vector-icons/FontAwesome5';
import { useCalendars } from 'expo-localization';

import { AppSection, ButtonsContainer, CloseIconBox, Container, FormContainer, HeaderIcons } from "./styles";
import Colors from "../../Colors";
import MainTitle from "../../components/MainTitle";
import { useNavigation } from "@react-navigation/native";
import ButtonDefault from "../../components/ButtonDefault";
import { useAppTranslation } from "../../hooks/translation";
import Subtitle from "../../components/Subtitle";
import FormLabelControl from "../../components/FormLabelControl";
import FoodCategorySelector, { IFoodCategoryItem } from "../../components/FoodCategorySelector";
import TextInputCustom from "../../components/TextInputCustom";

import { IFoodRecord } from "../../interfaces/IFoodRecord";
import { useFoodRecord } from "../../hooks/food";
import Time from "../../Utils/Time";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SubRootStackParamList } from "../../Tabs/Home";

import 'dayjs/locale/pt';
import 'dayjs/locale/en';
import 'dayjs/locale/es';

dayjs.extend(require('dayjs/plugin/localizedFormat'));

type Props = NativeStackScreenProps<SubRootStackParamList, 'AddFoodRegistry'>;

export default function AddFoodRegistry({ route }: Props) {

  const navigation = useNavigation();
  const use24HClock = useCalendars()[0].uses24hourClock || false;
  const { Translate, selectedLanguage } = useAppTranslation();

  const ref_caloriesInput = useRef<TextInput>(null);

  const { addFoodRecord, updateFoodRecord } = useFoodRecord();

  const [currentDate, setCurrentDate] = useState(dayjs(route.params?.foodRecord.timestamp));

  const [foodRecord, setFoodRecord] = useState<IFoodRecord>(route.params?.foodRecord || {
    name: '',
    categoryLevel: 0,
    kcal: 0,
    timestamp: currentDate.toISOString(),
  });

  const formLabelTranslated = useMemo(() => ({
    whatDoYouEat: Translate('NewRegistry.Fields.WhatDoYouEat'),
    howManyCalories: Translate('NewRegistry.Fields.HowManyCalories'),
  }), [selectedLanguage]);

  const foodCategories = useMemo<IFoodCategoryItem[]>(() => ([
    {
      id: 1,
      label: Translate('Food.Category.Light'),
      icon: 'smile',
      checked: false,
    },
    {
      id: 2,
      label: Translate('Food.Category.Moderate'),
      icon: 'exclamation-triangle',
      checked: false,
    },
    {
      id: 3,
      label: Translate('Food.Category.Heavy'),
      icon: 'sad-tear',
      checked: false,
    },
  ]), [selectedLanguage]);

  const handleOpenTimePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange,
      mode: 'time',
      is24Hour: use24HClock,
    });
  }

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set') {
      if (selectedDate !== undefined) {
        setCurrentDate(dayjs(selectedDate));
        setFoodRecord({ ...foodRecord, timestamp: Time.ISO8601Format(selectedDate) });
      }
    }
  };

  const handleUpdateFoodRecordField = (field: string, value: string | number) => {
    setFoodRecord({ ...foodRecord, [field]: value });
  }

  const handleSaveFoodRecord = useCallback(() => {

    const fieldsWithError = [];

    if (foodRecord.categoryLevel === 0) fieldsWithError.push(Translate('Food.Category.FullLabelAllTypes'));
    if (!foodRecord.name) fieldsWithError.push(formLabelTranslated.whatDoYouEat);
    if (!foodRecord.kcal) fieldsWithError.push(formLabelTranslated.howManyCalories);

    if (fieldsWithError.length > 0) {
      Alert.alert(
        Translate('Alert.Warning'),
        `${Translate('Alert.Message.NeedFillTheFields')}\n\n${fieldsWithError.join('\n')}`,
      );

      return false;
    }

    if (!foodRecord.id) addFoodRecord(foodRecord);
    else updateFoodRecord(foodRecord);

    navigation.goBack();
  }, [foodRecord, currentDate]);

  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={50} style={{ flex: 1 }}>
      <Container>
        <AppSection>
          <HeaderIcons>
            <Icon name="utensils" size={40} color={Colors.Primary} />
            <CloseIconBox onPress={() => navigation.goBack()}>
              <Icon name="times-circle" size={20} color="#666" />
            </CloseIconBox>
          </HeaderIcons>
          <MainTitle>
            {!foodRecord?.id
              ? Translate('NewRegistry.New.Title')
              : Translate('NewRegistry.Edit.Title')}
          </MainTitle>
          <Subtitle>
            {!foodRecord?.id
              ? Translate('NewRegistry.New.Description')
              : Translate('NewRegistry.Edit.Description')}
          </Subtitle>

          <FormContainer>
            <FormLabelControl text={Translate('NewRegistry.Fields.WhichCategory')} />

            <FoodCategorySelector
              initialCategoryLevel={foodRecord.categoryLevel}
              options={foodCategories}
              handleChange={(categoryId) => handleUpdateFoodRecordField('categoryLevel', categoryId)} />

            <TextInputCustom
              value={foodRecord.name}
              label={formLabelTranslated.whatDoYouEat}
              placeholder="Ex: Strogonoff"
              onChange={text => handleUpdateFoodRecordField('name', text as string)}
              handlePressIcon={() => handleUpdateFoodRecordField('name', '')}
              onSubmitEditing={() => ref_caloriesInput?.current?.focus()}
            />

            <TextInputCustom
              ref={ref_caloriesInput}
              value={foodRecord.kcal > 0 ? foodRecord.kcal.toString() : ''}
              label={formLabelTranslated.howManyCalories}
              placeholder="Ex: 294"
              keyboardType="numeric"
              onChange={text => handleUpdateFoodRecordField('kcal', parseInt(text, 10))}
              handlePressIcon={() => handleUpdateFoodRecordField('kcal', '')}
            />

            <TextInputCustom
              label={Translate('NewRegistry.Fields.WhichMoment')}
              value={dayjs(currentDate).locale(selectedLanguage).format('LT')}
              renderAsDateTimePicker
              handlePressIcon={handleOpenTimePicker}
              onChange={() => null}
            />

            <ButtonsContainer>
              <ButtonDefault text={Translate('Buttons.SaveRegistry')} onPress={handleSaveFoodRecord} />
            </ButtonsContainer>
          </FormContainer>
        </AppSection>
      </Container>
    </KeyboardAvoidingView>
  )
}
