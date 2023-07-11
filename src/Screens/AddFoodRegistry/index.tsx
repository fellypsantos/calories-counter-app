import { useState, useMemo, useEffect, useCallback } from "react";
import { KeyboardAvoidingView, Text } from "react-native";
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import dayjs from "dayjs";
import Icon from '@expo/vector-icons/FontAwesome5';

import { AppSection, ButtonsContainer, CloseIconBox, Container, FormContainer, HeaderIcons } from "./styles";
import Colors from "../../Colors";
import MainTitle from "../../components/MainTitle";
import { useNavigation } from "@react-navigation/native";
import ButtonDefault from "../../components/ButtonDefault";
import { useAppTranslation } from "../../hooks/translation";
import Subtitle from "../../components/Subtitle";
import FormLabelControl from "../../components/FormLabelControl";
import FoodCategorySelector from "../../components/FoodCategorySelector";
import TextInputCustom from "../../components/TextInputCustom";

import 'dayjs/locale/pt';
import 'dayjs/locale/en';
import 'dayjs/locale/es';

dayjs.extend(require('dayjs/plugin/localizedFormat'));

export default function AddFoodRegistry() {

  const navigation = useNavigation();
  const { Translate, selectedLanguage } = useAppTranslation();

  const [foodName, setFoodName] = useState('');
  const [foodKcal, setFoodKcal] = useState('');
  const [foodCategory, setFoodCategory] = useState();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [editableItem, setEditableItem] = useState(null);

  const formLabelTranslated = useMemo(() => ({
    whatDoYouEat: Translate('NewRegistry.Fields.WhatDoYouEat'),
    howManyCalories: Translate('NewRegistry.Fields.HowManyCalories'),
  }), [selectedLanguage]);

  const handleOpenTimePicker = useCallback(() => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange,
      mode: 'time',
      is24Hour: true,
    });
  }, []);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set') {
      if (selectedDate !== undefined) {
        setCurrentDate(dayjs(selectedDate));
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Container>
        <AppSection>
          <HeaderIcons>
            <Icon name="utensils" size={40} color={Colors.Primary} />
            <CloseIconBox onPress={() => navigation.goBack()}>
              <Icon name="times-circle" size={18} color="#666" />
            </CloseIconBox>
          </HeaderIcons>
          <MainTitle>
            {editableItem === null
              ? Translate('NewRegistry.New.Title')
              : Translate('NewRegistry.Edit.Title')}
          </MainTitle>
          <Subtitle>
            {editableItem === null
              ? Translate('NewRegistry.New.Description')
              : Translate('NewRegistry.Edit.Description')}
          </Subtitle>

          <FormContainer>
            <FormLabelControl text={Translate('NewRegistry.Fields.WhichCategory')} />

            <FoodCategorySelector handleChange={() => { }} />

            <TextInputCustom
              value={foodName}
              label={formLabelTranslated.whatDoYouEat}
              placeholder="Ex: Strogonoff"
              onChange={text => setFoodName(text)}
              handlePressIcon={() => setFoodName('')}
            />

            <TextInputCustom
              value={foodKcal}
              label={formLabelTranslated.howManyCalories}
              placeholder="Ex: 294"
              keyboardType="numeric"
              onChange={text => setFoodKcal(text)}
              handlePressIcon={() => setFoodKcal('')}
            />

            <TextInputCustom
              label={Translate('NewRegistry.Fields.WhichMoment')}
              value={dayjs(currentDate).locale(selectedLanguage).format('LT')}
              renderAsDateTimePicker
              handlePressIcon={handleOpenTimePicker}
              onChange={() => null}
            />

            <ButtonsContainer>
              <ButtonDefault
                text={Translate('Buttons.SaveRegistry')}
                onPress={() => {



                }}
              />
            </ButtonsContainer>
          </FormContainer>
        </AppSection>
      </Container>
    </KeyboardAvoidingView>
  )
}
