import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import Icon from '@expo/vector-icons/FontAwesome5';

import { AppSection, CloseIconBox, Container, HeaderIcons } from "./styles";
import Colors from "../../Colors";
import MainTitle from "../../components/MainTitle";

export default function AddFoodRegistry() {
  const [show, setShow] = useState(false);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Container>
        <AppSection>
          {/* DATE PICKER */}
          {show && (
            <DateTimePickerAndroid
              value={dayjs(currentDate).toDate()}
              mode="time"
              onChange={onChange}
            />
          )}
          <HeaderIcons>
            <Icon name="utensils" size={40} color={Colors.Primary} />
            <CloseIconBox onPress={handleClose}>
              <Icon name="times-circle" size={18} color="#666" />
            </CloseIconBox>
          </HeaderIcons>

          <MainTitle>
            {editableItem === undefined
              ? Translator('NewRegistry.New.Title')
              : Translator('NewRegistry.Edit.Title')}
          </MainTitle>
          <Subtitle>
            {editableItem === undefined
              ? Translator('NewRegistry.New.Description')
              : Translator('NewRegistry.Edit.Description')}
          </Subtitle>

          <FormContainer>
            <FormLabelControl
              text={Translator('NewRegistry.Fields.WhichCategory')}
            />
            <FoodCategorySelector
              arrOptions={FoodCategoryOptions}
              handleChange={newValue => setFoodCategory(newValue)}
            />

            <TextInputCustom
              value={foodName}
              label={labelWhatDoYouEat}
              placeholder="Ex: Strogonoff"
              onChange={text => setFoodName(text)}
              handleIconFunction={() => setFoodName('')}
            />

            <TextInputCustom
              value={foodKcal}
              label={labelHowManyCalories}
              placeholder="Ex: 294"
              keyboardType="numeric"
              onChange={text => setFoodKcal(text)}
              handleIconFunction={() => setFoodKcal('')}
            />

            <TextInputCustom
              label={Translator('NewRegistry.Fields.WhichMoment')}
              value={dayjs(currentDate).locale('pt').format('LT')}
              renderAsDateTimePicker
              handleIconFunction={() => setShow(true)}
            />

            <ButtonsContainer>
              <ButtonDefault
                text={Translator('Buttons.SaveRegistry')}
                onPress={handleSaveFoodRegistry}
              />
            </ButtonsContainer>
          </FormContainer>
        </AppSection>
      </Container>
    </KeyboardAvoidingView>
  )
}
